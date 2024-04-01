import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
	try {
		const res = await axios.get(URL + "products/categorized");
		return res.data.categorizedProducts;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});

export const fetchFilteredProducts = createAsyncThunk("products/filterProducts", async ({ value, filterBy }) => {
	try {
		const res = await axios.get(URL + "products/filter/" + filterBy + "/" + value);
		return res.data.filterProducts;
	} catch (err) {
		console.log(err);
		alert("Searched Product not found");
		return Promise.reject(err);
	}
});

const productsSlice = createSlice({
	name: "products",

	initialState: {
		filteredProducts: [],
		categorizedProducts: [],
		status: "idle",
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state, action) => {
				state.status = "Pending";
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = "Success";
				state.categorizedProducts = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = "Rejection";
			});

		builder.addCase(fetchFilteredProducts.fulfilled, (state, action) => {
			console.log(action.payload);
			state.filteredProducts = action.payload;
		});
	},
});

export default productsSlice.reducer;
