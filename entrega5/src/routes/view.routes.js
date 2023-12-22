import { Router } from "express";

import { productsModel } from "../models/user.model";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let products = await productsModel.find();
    res.send({ result: "success", payload: products });
  } catch (error) {
    console.log(error);
  }
});

export default router;
