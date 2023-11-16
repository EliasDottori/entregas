const express = require("express");
const ProductManager = require("./ProductManager"); // Asegúrate de ajustar la ruta correcta

const app = express();
const port = 8080; // Puedes cambiar el puerto según tus necesidades

const productManager = new ProductManager("productos.json");

app.get("/", (res) => {
  res.send("Bienvenido a la aplicación de productos!");
});

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor online! vinculo: http://localhost:${port}`);
});
