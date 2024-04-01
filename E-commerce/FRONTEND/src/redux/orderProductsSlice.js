import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { exportCartProducts } from "./cartProductsSlice";
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

export const exportOrderDetails = createAsyncThunk("user/orderToDB", async ({ uid, cartItems, totalPrice, dispatch }) => {
	const orderItems = cartItems.map((item) => {
		return { product: item.product._id, seller: item.product.seller ?? item.product.sellerDetails._id, count: item.count };
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
		alert("Stock Not Available");
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
				const date = new Date().toString();
				state.orders.push({ ...action.payload, date: date });
			})
			.addCase(exportOrderDetails.rejected, (state, action) => {
				console.log("stocks not available");
			});
	},
});

export default orderProductsSlice.reducer;
