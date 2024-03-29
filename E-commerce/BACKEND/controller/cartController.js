import User from "../models/users.js";
import cartRoute from "../routers/cartRoutes.js";
import { getUser } from "./auth.js";

export async function updateCart(req, res) {
	const uid = req.header("Authorization");

	const userId = getUser(uid)._id;

	try {
		const updated = await User.findOneAndUpdate(
			{
				_id: userId,
				// "cartItems.product": req.body.productId,
			},
			{
				$set: { cart: { cartItems: req.body.cartItems, totalPrice: req.body.totalPrice } },
			}
		);

		res.status(200).json({ message: "Success", updatedEntry: updated });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function getCartProducts(req, res) {
	const uid = req.header("Authorization");
	const userId = getUser(uid)._id;
	try {
		const data = await User.find({ _id: userId }, { cart: 1 }).populate("cart.cartItems.product");
		res.status(200).json({ message: "success", cart: data[0].cart.cartItems, totalPrice: data[0].cart.totalPrice });
	} catch (err) {
		console.log(err);
	}
}
