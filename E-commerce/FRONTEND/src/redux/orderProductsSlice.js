import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_URL;

export const fetchOrderProducts = createAsyncThunk("cart/fetchOrderProducts", async (uid) => {
	try {
		const res = await axios.get(BASEURL + "user/orders", {
			headers: {
				Authorization: uid,
			},
		});

		return { orders: res.data.orders };
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});

export const exportOrderDetails = createAsyncThunk("user/orderToDB", async ({ uid, cartItems, totalPrice }) => {
	const orderItems = cartItems.map((item) => {
		return { product: item.product._id, count: item.count };
	});

	try {
		const res = await axios.post(
			BASEURL + "user/orders/addOrder",
			{
				orderItems: orderItems,
				totalPrice: totalPrice,
				date: new Date().toDateString(),
			},
			{
				headers: {
					Authorization: uid,
				},
			}
		);
		const newOrder = { items: cartItems, totalPrice: totalPrice };
		return newOrder;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});

const orderProductsSlice = createSlice({
	name: "orderProducts",

	initialState: {
		fetchState: "",
		orders: [],
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchOrderProducts.pending, (state, action) => {
				state.fetchState = " fetching orders Items.....";
			})
			.addCase(fetchOrderProducts.fulfilled, (state, action) => {
				state.fetchState = "Fetched";

				state.orders = action.payload.orders;
			})
			.addCase(fetchOrderProducts.rejected, (state, action) => {
				state.fetchState = "Error while Fetching orderItems.....";
			})
			.addCase(exportOrderDetails.fulfilled, (state, action) => {
				state.orders.push({ ...action.payload, date: new Date() });
			});
	},
});

export default orderProductsSlice.reducer;
