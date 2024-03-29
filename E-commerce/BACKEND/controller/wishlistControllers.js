import { getUser } from "./auth.js";
import User from "../models/users.js";

export async function updateWishlist(req, res) {
	const uid = req.header("Authorization");
	const userId = getUser(uid)._id;
	let updated = null;
	try {
		const itemFound = await User.findOne({
			_id: userId,
			wishlist: req.body.productId,
		});

		if (itemFound === null) {
			updated = await User.findOneAndUpdate(
				{
					_id: userId,
				},
				{ $addToSet: { wishlist: req.body.productId } }
			);
		} else {
			updated = await User.findOneAndUpdate(
				{
					_id: userId,
				},
				{ $pull: { wishlist: req.body.productId } }
			);
		}

		res.status(200).json({ message: "Success", updated: updated });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export async function getWishlist(req, res) {
	const uid = req.header("Authorization");
	const userId = getUser(uid)._id;
	try {
		const data = await User.find({ _id: userId }, { wishlist: 1 }).populate("wishlist");

		if (data.length === 0) {
			res.status(404).json({ error: "No Wishlist Items found" });
		}
		res.status(200).json({ message: "success", wishlist: data[0].wishlist });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
