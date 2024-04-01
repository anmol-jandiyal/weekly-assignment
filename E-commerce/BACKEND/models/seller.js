import mongoose from "mongoose";

import { userSchema } from "./users.js";

const sellerSchema = mongoose.Schema({
	productsSell: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
	orderPlaced: [
		{
			product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
			/* product: {
				title: { type: String, required: true, trim: true },
				description: { type: String, required: true, trim: true },
				price: { type: Number, required: true },
				brand: { type: String, default: "Undefined" },
				category: { type: String, required: true },
				thumbnail: { type: String, required: true },
			}, */
			count: { type: Number, default: 1 },

			userName: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },

			date: Date,
		},
	],
});

sellerSchema.add(userSchema);
const Seller = mongoose.model("seller", sellerSchema);

export default Seller;
