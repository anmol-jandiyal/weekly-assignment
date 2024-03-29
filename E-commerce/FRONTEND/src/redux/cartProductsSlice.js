import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_URL;
export const fetchCartProducts = createAsyncThunk("cart/fetchCartProducts", async (uid) => {
	try {
		const res = await axios.get(BASEURL + "cart/cartProducts", {
			headers: {
				Authorization: uid,
			},
		});

		return res.data;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});

export const exportCartProducts = createAsyncThunk("cart/exportCartProducts", async ({ uid, cartItems, totalPrice, cartUpdated = true }) => {
	const newCartItems = cartItems.map((item) => {
		return { product: item.product._id, count: item.count };
	});

	try {
		await axios.post(
			BASEURL + "cart/updateCart",
			{
				cartItems: newCartItems,
				totalPrice: totalPrice,
			},
			{
				headers: {
					Authorization: uid,
				},
			}
		);
		return { cartUpdated: cartUpdated };
	} catch (err) {
		console.log(err);
	}
});

const cartProductsSlice = createSlice({
	name: "cartProducts",

	initialState: {
		cartProductsArray: [],
		totalPrice: 0,
		fetchState: "idle",
		exportStatus: "idle",
		cartUpdateStatus: false,
	},

	reducers: {
		setUpdateState: (state, action) => {
			state.cartUpdateStatus = false;
		},

		addProductToCart: (state, action) => {
			const product = action.payload.product;
			const id = product._id;

			const index = state.cartProductsArray.findIndex((prod) => {
				return prod.product._id === id;
			});

			if (index === -1) {
				state.cartProductsArray.push({ product: action.payload.product, count: 1 });
			} else {
				state.cartProductsArray[index].count++;
			}

			//in both cases i.e new product or existing product we increment in the price
			state.totalPrice += product.price;
			state.cartUpdateStatus = true;
		},

		removeFromCart: (state, action) => {
			const id = action.payload.id;
			const index = state.cartProductsArray.findIndex((prod) => {
				return prod.product._id === id;
			});
			state.totalPrice -= state.cartProductsArray[index].count * state.cartProductsArray[index].product.price;
			state.cartProductsArray.splice(index, 1);
			state.cartUpdateStatus = true;
		},
		countIncreaseDecrease: (state, action) => {
			const offSet = action.payload.offSet;
			const id = action.payload.id;

			const index = state.cartProductsArray.findIndex((prod) => {
				return prod.product._id === id;
			});

			//offset = 1 if addition and offset = -1 if we have to  decrease the product count

			state.cartProductsArray[index].count += offSet;
			state.totalPrice += state.cartProductsArray[index].product.price * offSet;

			if (state.cartProductsArray[index].count === 0) {
				//remove the product from the cart
				state.cartProductsArray.splice(index, 1);
			}
			state.cartUpdateStatus = true;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchCartProducts.pending, (state, action) => {
				state.fetchState = "Fetching Cart Items.....";
			})
			.addCase(fetchCartProducts.fulfilled, (state, action) => {
				state.fetchState = "Fetched";

				state.totalPrice = action.payload.totalPrice;
				state.cartProductsArray = action.payload.cart;
			})
			.addCase(fetchCartProducts.rejected, (state, action) => {
				state.fetchState = "Error while Fetching Cart Items.....";
			});

		builder.addCase(exportCartProducts.fulfilled, (state, action) => {
			if (!action.payload.cartUpdated) {
				//order is performed so cart needs to be empty
				state.totalPrice = 0;
				state.cartProductsArray = [];
			}
		});
	},
});

export default cartProductsSlice.reducer;
export const { addProductToCart, removeFromCart, countIncreaseDecrease, setUpdateState } = cartProductsSlice.actions;
