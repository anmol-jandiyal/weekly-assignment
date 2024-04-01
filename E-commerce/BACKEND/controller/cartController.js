import Seller from "../models/seller.js";
import User from "../models/users.js";
import cartRoute from "../routers/cartRoutes.js";
import { getUser } from "./auth.js";

export async function updateCart(req, res) {
	const uid = req.header("Authorization");

	const user = getUser(uid);

	try {
		let updated;
		if (user.privilege === "seller") {
			updated = await Seller.findOneAndUpdate(
				{
					_id: user._id,
					// "cartItems.product": req.body.productId,
				},
				{
					$set: { cart: { cartItems: req.body.cartItems, totalPrice: req.body.totalPrice } },
				}
			);
		} else {
			updated = await User.findOneAndUpdate(
				{
					_id: user._id,
					// "cartItems.product": req.body.productId,
				},
				{
					$set: { cart: { cartItems: req.body.cartItems, totalPrice: req.body.totalPrice } },
				}
			);
		}

		res.status(200).json({ message: "Success", updatedEntry: updated });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function getCartProducts(req, res) {
	const uid = req.header("Authorization");
	const user = getUser(uid);
	try {
		let data;
		if (user.privilege === "seller") {
			data = await Seller.findOne({ _id: user._id }, { cart: 1 }).populate("cart.cartItems.product");
		} else {
			data = await User.findOne({ _id: user._id }, { cart: 1 }).populate("cart.cartItems.product");
		}

		res.status(200).json({ message: "success", cart: data.cart.cartItems, totalPrice: data.cart.totalPrice });
	} catch (err) {
		console.log(err);
	}
}
