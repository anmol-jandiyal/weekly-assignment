import { getUser } from "./auth.js";
import User from "../models/users.js";
import Seller from "../models/seller.js";
import { updateSellerOrderPlacedArray } from "./sellerController.js";
import Product from "../models/products.js";

export async function updateOrders(req, res) {
	const uid = req.header("Authorization");
	const user = getUser(uid);
	console.log(req.body.orderItems);
	const items = req.body.orderItems;

	const totalPrice = req.body.totalPrice;
	const date = req.body.date;
	try {
		for (const item of items) {
			const productDetails = await Product.findOne({ _id: item.product });

			if (productDetails.stock < item.count) {
				console.log("stock not available");
				return res.status(404).json({ message: "Stock not available", item: item });
			} else {
				await Product.findOneAndUpdate(
					{
						_id: item.product,
					},
					{
						$inc: { stock: -item.count },
					}
				);
			}
		}

		let updated;
		if (user.privilege === "seller") {
			updated = await Seller.findOneAndUpdate(
				{
					_id: user._id,
				},
				{
					$push: { orders: { items: items, totalPrice: totalPrice, date: date } },
				}
			);
		} else {
			updated = await User.findOneAndUpdate(
				{
					_id: user._id,
				},
				{
					$push: { orders: { items: items, totalPrice: totalPrice, date: date } },
				}
			);
		}

		updateSellerOrderPlacedArray(user, req.body);

		res.status(200).json({ message: "Success", updatedEntry: updated });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function getOrders(req, res) {
	const uid = req.header("Authorization");
	const user = getUser(uid);
	try {
		let data;
		if (user.privilege === "seller") {
			data = await Seller.find({ _id: user._id }, { orders: 1 }).populate("orders.items.product");
		} else {
			data = await User.find({ _id: user._id }, { orders: 1 }).populate("orders.items.product");
		}

		if (data.length === 0) {
			res.status(404).json({ error: "No order found" });
		}
		res.status(200).json({ message: "success", orders: data[0].orders });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
