import mongoose from "mongoose";
import Product from "../models/products.js";

function addProduct(req, res) {
	const productsDetails = req.body.products;

	Product.insertMany(productsDetails)
		.then((data) => {
			console.log(data);
			return res.status(201).json({ message: "success", data: data });
		})
		.catch((err) => {
			console.log(err);
			if (err.name === "ValidationError") {
				return res.status(400).json(err);
			}
			return res.status(500).json(err);
		});
}

async function getProducts(req, res) {
	try {
		if (req.params.id === undefined) {
			const data = await Product.find();
			res.status(200).json({ message: "Success", products: data });
		} else {
			const data = await Product.findById(req.params.id);

			res.status(200).json({ message: "Success", products: data });
		}
	} catch (err) {
		res.status(500).json({ error: "Internal error while fetching data from database" });
	}
}

export { addProduct, getProducts };
