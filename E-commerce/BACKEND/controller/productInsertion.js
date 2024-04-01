import Product from "../models/products.js";
import { getUser } from "./auth.js";
import Seller from "../models/seller.js";

async function addProducts(req, res) {
	const uid = req.header("Authorization");
	const user = getUser(uid);
	let productsDetails = null;

	if (req.body.products && req.body.products.length === undefined) {
		//it means only one book needs to be added
		//if only one book is going to be inserted
		productsDetails = { ...req.body.products, seller: user._id };
	} else {
		//return array of objects that contains seller userid also
		productsDetails = req.body.products.map((prod) => {
			return { ...prod, seller: user._id };
		});
	}

	try {
		const data = await Product.insertMany(productsDetails);

		//now insert productid to the seller
		const productIds = data.map((prod) => {
			return prod._id;
		});

		const updatedSeller = await Seller.findOneAndUpdate(
			{
				_id: user._id,
			},
			{
				$addToSet: { productsSell: { $each: productIds } },
			}
		);

		return res.status(201).json({ message: "success", data: { updatedSeller, data } });
	} catch (err) {
		console.log(err);
		if (err.name === "ValidationError") {
			return res.status(400).json(err);
		}
		return res.status(500).json(err);
	}
}

async function getProducts(req, res) {
	try {
		if (req.params.id === undefined) {
			const data = await Product.aggregate([
				{
					$lookup: {
						from: "sellers",
						localField: "seller",
						foreignField: "_id",
						as: "sellerDetails",
					},
				},
				{
					$unwind: "$sellerDetails",
				},
				{
					$project: {
						thumbnail: 1,
						price: 1,
						title: 1,
						description: 1,
						_id: 1,

						"sellerDetails.name": 1,
						"sellerDetails._id": 1,
					},
				},
			]);

			res.status(200).json({ message: "Success", products: data });
		} else {
			const data = await Product.findById(req.params.id);

			res.status(200).json({ message: "Success", products: data });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal error while fetching data from database" });
	}
}

export { addProducts, getProducts };
