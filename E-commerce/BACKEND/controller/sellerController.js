import { getUser } from "./auth.js";
import mongoose from "mongoose";
import Product from "../models/products.js";
import Seller from "../models/seller.js";
async function editProductDetails(req, res) {
	const newProductDetail = req.body.productDetails;
	try {
		const updatedDetails = await Product.findOneAndUpdate(
			{
				_id: newProductDetail._id,
			},
			{
				// title: newProductDetail.title,
				...newProductDetail,
			},
			{
				new: true,
			}
		);

		res.status(200).json({ message: "Success", updated: updatedDetails });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal error while fetching data from database" });
	}
}

async function deleteProduct(req, res) {
	const productId = req.body.productId;

	try {
		const productDeleteDetails = await Product.findOneAndUpdate(
			{
				_id: productId,
			},
			{
				$set: { stock: 0 },
			}
		);

		res.status(200).json({ message: "Success", deleteDetails: { productDeleteDetails } });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal error while fetching data from database" });
	}
}
async function getSellerProducts(req, res) {
	const uid = req.header("Authorization");
	const user = getUser(uid);

	try {
		const data = await Seller.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(user._id),
				},
			},
			{
				$lookup: {
					from: "products",
					localField: "productsSell",
					foreignField: "_id",
					as: "products",
				},
			},
			{
				$project: {
					products: 1,
				},
			},
		]);
		console.log(data);

		res.status(200).json({ message: "Success", sellerDetail: data });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal error while fetching data from database" });
	}
}

async function getSellerSoldData(req, res) {
	const uid = req.header("Authorization");
	const user = getUser(uid);
	try {
		const data = await Seller.find(
			{
				_id: user._id,
			},
			{
				orderPlaced: 1,
			}
		).populate("orderPlaced.product");

		res.status(200).json({ message: "Success", orderPlaced: data[0].orderPlaced });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
async function updateSellerOrderPlacedArray(user, { orderItems, date }) {
	for (const item of orderItems) {
		const sellerId = item.seller;
		const productId = item.product;

		const count = item.count;
		try {
			await Seller.findOneAndUpdate(
				{
					_id: sellerId,
				},
				{
					$push: { orderPlaced: { product: productId, count: count, userName: user.userName, date: date } },
				}
			);
		} catch (err) {
			console.log(err);
		}
	}
}

export { getSellerProducts, editProductDetails, deleteProduct, updateSellerOrderPlacedArray, getSellerSoldData };
