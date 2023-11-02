class ProductManager {
  constructor() {
    this.products = [];
    this.productId = 1;
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
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado");
    }
  }
}

const productManager = new ProductManager();
productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 10.99,
  thumbnail: "imagen1.jpg",
  code: "P001",
  stock: 100,
});
productManager.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 19.99,
  thumbnail: "imagen2.jpg",
  code: "P002",
  stock: 50,
});

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
console.log(productManager.getProductById(3));
