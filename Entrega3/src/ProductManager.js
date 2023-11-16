const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
    this.productId = this.generateNextId();
  }

  generateNextId() {
    if (this.products.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.products.map((product) => product.id));
    return maxId + 1;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, "utf8");
  }

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((p) => p.code === product.code)) {
      console.log("El código ya existe");
      return;
    }

    product.id = this.productId++;
    this.products.push(product);
    this.saveProducts();
  }

  getProducts(limit) {
    let productsToReturn = this.products;

    if (limit) {
      productsToReturn = productsToReturn.slice(0, parseInt(limit));
    }

    return productsToReturn;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado");
    }
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProducts();
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    } else {
      console.log("Producto no encontrado");
    }
  }
}

module.exports = ProductManager;
