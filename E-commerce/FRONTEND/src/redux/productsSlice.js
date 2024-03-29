import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
	try {
		const res = await axios.get(URL + "products/");
		return res.data.products;
	} catch (err) {}
});

const productsSlice = createSlice({
	name: "products",

	initialState: {
		productsArray: [],
		status: "idle",
	},
	reducers: {
		/* 	setProducts: (state, action) => {
			state.productsArray = [...action.payload.products];
		}, */
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state, action) => {
				state.status = "Pending";
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = "Success";
				state.productsArray = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = "Rejection";
			});
	},
});

export default productsSlice.reducer;
