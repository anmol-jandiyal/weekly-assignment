import Product from "../models/products.js";

export async function getCategorizedProduct(req, res) {
	try {
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
					brand: 1,
					category: 1,
					thumbnail: 1,
					price: 1,
					title: 1,
					description: 1,
					_id: 1,
					stock: 1,
					"sellerDetails.name": 1,
					"sellerDetails._id": 1,
				},
			},
			{
				$group: {
					_id: "$category",
					product: {
						$push: "$$ROOT",
					},
				},
			},
		]);

		if (data.length === 0) {
			return res.status(404).json({ error: "No category found" });
		}
		return res.status(200).json({ message: "Success", categorizedProducts: data });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal server error" });
	}
}

export async function filterProducts(req, res) {
	const filterby = req.params.filterby;
	const value = req.params.value;
	let data = null;

	try {
		if (filterby === "category") {
			data = await Product.aggregate([
				{
					$match: {
						category: { $regex: value, $options: "i" },
					},
				},

				{
					$lookup: {
						from: "sellers",
						localField: "seller",
						foreignField: "_id",
						as: "sellerDetails",
					},
				},
			]);
		} else {
			data = await Product.aggregate([
				{
					$match: {
						title: { $regex: value, $options: "i" },
					},
				},

				{
					$lookup: {
						from: "sellers",
						localField: "seller",
						foreignField: "_id",
						as: "sellerDetails",
					},
				},
			]);
		}

		console.log(data);
		if (data.length === 0) {
			return res.status(404).json({ error: "No Product found" });
		}
		return res.status(200).json({ message: "Success", filterProducts: data });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Internal server error" });
	}
}
