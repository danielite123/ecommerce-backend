import express from "express";
import {
  createProduct,
  getUserProducts,
} from "../controller/product.controllers.js";
import { verifyAdmin, verifyJWT } from "../common/jwt.js";

const app = express.Router();

app.post("/create-product", verifyJWT, verifyAdmin, createProduct);
app.get("/:userId/products", verifyJWT, verifyAdmin, getUserProducts);

export default app;
