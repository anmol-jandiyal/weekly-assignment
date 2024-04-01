import mongoose from "mongoose";

const productModel = mongoose.Schema({
	title: { type: String, required: true, trim: true },

	description: { type: String, required: true, trim: true },
	price: { type: Number, required: true },
	discountPercentage: { type: Number, required: true },
	rating: { type: Number },
	stock: { type: Number, required: true },
	brand: { type: String, default: "Undefined" },
	category: { type: String, required: true },
	thumbnail: { type: String, required: true },
	images: [{ type: String }],

	seller: { type: mongoose.Schema.Types.ObjectId, ref: "seller" },
});

const Product = mongoose.model("product", productModel);
export default Product;
