import express from "express";
import { restrictToLoggedUser } from "../controller/loginSignup.js";
import { getOrders, updateOrders } from "../controller/orderController.js";
import { getWishlist, updateWishlist } from "../controller/wishlistControllers.js";
const userRoute = express.Router();

userRoute.post("/orders/addOrder", restrictToLoggedUser, updateOrders);
userRoute.get("/orders", restrictToLoggedUser, getOrders);
userRoute.get("/wishlist", restrictToLoggedUser, getWishlist);
userRoute.post("/wishlist", restrictToLoggedUser, updateWishlist);

export default userRoute;
