import { Schema, model } from "mongoose";

const productSchema = new Schema({
  nombre: String,
  bodega: String,
  tipo: String,
  variedad: String,
  año: Number,
  precio: Number,
});

const productModel = model("Product", productSchema);

export { productModel };
