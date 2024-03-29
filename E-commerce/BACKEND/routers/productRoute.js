import express from "express";
import { addProduct, getProducts } from "../controller/productInsertion.js";

const productRoute = express.Router();

productRoute.post("/add", addProduct);
productRoute.get("/", getProducts);
productRoute.get("/:id", getProducts);

export default productRoute;
