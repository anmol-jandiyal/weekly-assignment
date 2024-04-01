import express from "express";
import { addProducts, getProducts } from "../controller/productInsertion.js";
import { filterProducts, getCategorizedProduct } from "../controller/filters.js";
import { authorized } from "../controller/loginSignup.js";

const productRoute = express.Router();

productRoute.post("/add", authorized, addProducts);
productRoute.post("/addOne", authorized, addProducts);

productRoute.get("/", getProducts);
// productRoute.get("/:id", getProducts);
productRoute.get("/categorized", getCategorizedProduct);
productRoute.get("/filter/:filterby/:value", filterProducts);

export default productRoute;
