import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  nombre: String,
  bodega: String,
  tipo: String,
  variedad: String,
  año: Number,
  precio: Number,
});

export const productsModel = mongoose.model(productsCollection, productsSchema);
