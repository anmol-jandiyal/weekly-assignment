import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const userSchema = mongoose.Schema({
	name: { type: String, required: true, trim: true, lowercase: true },

	userName: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },

	password: { type: String, required: true, minLength: [8, "min length of password must be greater than 8"] },

	privilege: { type: String, enum: ["admin", "user", "seller"], default: "user" },

	wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],

	orders: [
		{
			items: [
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
				},
			],
			date: { type: Date },
			totalPrice: {
				type: Number,
				min: [0],
				default: 0,
			},
		},
	],

	cart: {
		cartItems: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, count: { type: Number, default: 1 } }],
		totalPrice: { type: Number, min: [0], default: 0 },
	},
});

userSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

const User = mongoose.model("user", userSchema);

export default User;
