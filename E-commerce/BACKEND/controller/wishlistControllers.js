import { getUser } from "./auth.js";
import User from "../models/users.js";
import Seller from "../models/seller.js";

export async function updateWishlist(req, res) {
	const uid = req.header("Authorization");
	const user = getUser(uid);

	let updated = null;
	try {
		if (user.privilege === "seller") {
			const itemFound = await Seller.findOne({
				_id: user._id,
				wishlist: req.body.productId,
			});

			if (itemFound === null) {
				updated = await Seller.findOneAndUpdate(
					{
						_id: user._id,
					},
					{ $addToSet: { wishlist: req.body.productId } }
				);
			} else {
				updated = await Seller.findOneAndUpdate(
					{
						_id: user._id,
					},
					{ $pull: { wishlist: req.body.productId } }
				);
			}
		} else {
			const itemFound = await User.findOne({
				_id: user._id,
				wishlist: req.body.productId,
			});

			if (itemFound === null) {
				updated = await User.findOneAndUpdate(
					{
						_id: user._id,
					},
					{ $addToSet: { wishlist: req.body.productId } }
				);
			} else {
				updated = await User.findOneAndUpdate(
					{
						_id: user._id,
					},
					{ $pull: { wishlist: req.body.productId } }
				);
			}
		}

		res.status(200).json({ message: "Success", updated: updated });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function getWishlist(req, res) {
	const uid = req.header("Authorization");
	const user = getUser(uid);

	try {
		let data;
		if (user.privilege === "seller") {
			data = await Seller.find({ _id: user._id }, { wishlist: 1 }).populate("wishlist");
		} else {
			data = await User.find({ _id: user._id }, { wishlist: 1 }).populate("wishlist");
		}

		res.status(200).json({ message: "success", wishlist: data[0].wishlist });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
