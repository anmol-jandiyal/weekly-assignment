import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_URL;

export const sellerProductAddition = createAsyncThunk("seller/productAddition", async ({ productDetails, navigate, uid }) => {
	if (
		!(
			productDetails.title &&
			productDetails.description &&
			productDetails.price &&
			productDetails.discountPercentage &&
			productDetails.stock &&
			productDetails.brand &&
			productDetails.category &&
			productDetails.thumbnail
		)
	) {
		alert("Please Enter each field");
		return Promise.reject("Enter each field");
	}

	try {
		const data = await axios.post(
			BASEURL + "products/add",
			{ products: productDetails },
			{
				headers: {
					Authorization: uid,
				},
			}
		);
		navigate("/mainPage/seller/products");
		return productDetails;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});

export const fetchSellerProducts = createAsyncThunk("seller/fetchProducts", async ({ uid }) => {
	try {
		const res = await axios.get(BASEURL + "seller/products", {
			headers: {
				Authorization: uid,
			},
		});

		return res.data.sellerDetail[0]?.products;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});
export const deleteProducts = createAsyncThunk("seller/deleteProduct", async ({ productId, uid }) => {
	try {
		const res = await axios.patch(
			BASEURL + "seller/product/delete",
			{
				productId: productId,
			},
			{
				headers: {
					Authorization: uid,
				},
			}
		);

		return { productId: productId };
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});

export const editProductDetails = createAsyncThunk("seller/editProduct", async ({ productDetails, navigate, uid }) => {
	try {
		console.log(productDetails);
		const res = await axios.patch(
			BASEURL + "seller/product/edit",
			{
				productDetails: productDetails,
			},
			{
				headers: {
					Authorization: uid,
				},
			}
		);
		navigate("/mainPage/seller/products");
		return res.data.updated;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});

export const fetchPlacedOrders = createAsyncThunk("seller/fetchPlaceOrders", async ({ uid }) => {
	try {
		const res = await axios.get(BASEURL + "seller/placedOrders", {
			headers: {
				Authorization: uid,
			},
		});

		return res.data.orderPlaced;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});

const sellerSlice = createSlice({
	name: "seller",

	initialState: {
		placedOrders: [],
		productsSell: [],
	},

	extraReducers: (builder) => {
		builder.addCase(sellerProductAddition.fulfilled, (state, action) => {
			state.productsSell.push(action.payload);
		});

		builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
			state.productsSell = action.payload ?? [];
		});
		builder
			.addCase(editProductDetails.fulfilled, (state, action) => {
				const newProduct = action.payload;
				const newProductsSell = state.productsSell.filter((prod) => prod._id !== newProduct._id);
				state.productsSell = [...newProductsSell, newProduct];
			})
			.addCase(deleteProducts.fulfilled, (state, action) => {
				const index = state.productsSell.findIndex((prod) => {
					return prod._id === action.payload.productId;
				});
				state.productsSell[index].stock = 0;
			})
			.addCase(fetchPlacedOrders.fulfilled, (state, action) => {
				state.placedOrders = action.payload;
			});
	},
});

export default sellerSlice.reducer;
