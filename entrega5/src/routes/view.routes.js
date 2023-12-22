import { Router } from "express";

import { productModel } from "../models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

export default router;
