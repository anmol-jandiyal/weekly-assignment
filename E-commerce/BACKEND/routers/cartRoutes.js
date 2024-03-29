import express from "express";

import { getCartProducts, updateCart } from "../controller/cartController.js";
import { restrictToLoggedUser } from "../controller/loginSignup.js";

const cartRoute = express.Router();

cartRoute.post("/updateCart", restrictToLoggedUser, updateCart);
cartRoute.get("/cartProducts", restrictToLoggedUser, getCartProducts);

export default cartRoute;
