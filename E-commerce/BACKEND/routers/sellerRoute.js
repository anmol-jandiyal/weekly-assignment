import express from "express";
import { authorized } from "../controller/loginSignup.js";
import { deleteProduct, editProductDetails, getSellerProducts, getSellerSoldData } from "../controller/sellerController.js";

const sellerRoute = express.Router();

sellerRoute.get("/orders", authorized, getSellerProducts);
sellerRoute.get("/products", authorized, getSellerProducts);
sellerRoute.patch("/product/edit", authorized, editProductDetails);
sellerRoute.patch("/product/delete", authorized, deleteProduct);
sellerRoute.get("/placedOrders", authorized, getSellerSoldData);
export default sellerRoute;
