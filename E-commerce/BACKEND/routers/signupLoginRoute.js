import express from "express";
import { userSignUp, userLogin, anyOneLoggedIn } from "../controller/loginSignup.js";

const signLogRoute = express.Router();

signLogRoute.post("/signup", userSignUp);
signLogRoute.post("/login", anyOneLoggedIn, userLogin);
// signLogRoute.post("/logout", userLogOut);

export default signLogRoute;
