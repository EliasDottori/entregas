import { Router } from "express";

import productos from "../public/productos.json" assert { type: "json" };

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Bienvenido a El Bodegon!",
    fileCss: "style.css",
    urlProductos: "/productos",
  });
});

router.get("/productos", (req, res) => {
  res.render("productos", {
    productos,
    fileCss: "food.css",
  });
});

export default router;
