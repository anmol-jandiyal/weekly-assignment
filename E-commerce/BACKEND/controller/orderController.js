import { getUser } from "./auth.js";
import User from "../models/users.js";

export async function updateOrders(req, res) {
	const uid = req.header("Authorization");

	const userId = getUser(uid)._id;

	try {
		const updated = await User.findOneAndUpdate(
			{
				_id: userId,
			},
			{
				$addToSet: { orders: { items: req.body.orderItems, totalPrice: req.body.totalPrice, date: req.body.date } },
			}
		);

		res.status(200).json({ message: "Success", updatedEntry: updated });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function getOrders(req, res) {
	const uid = req.header("Authorization");
	const userId = getUser(uid)._id;
	try {
		const data = await User.find({ _id: userId }, { orders: 1 }).populate("orders.items.product");

		if (data.length === 0) {
			res.status(404).json({ error: "No order found" });
		}
		res.status(200).json({ message: "success", orders: data[0].orders });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
