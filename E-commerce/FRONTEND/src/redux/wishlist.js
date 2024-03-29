import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_URL;

export const fetchWislist = createAsyncThunk("cart/fetchWishlist", async (uid) => {
	try {
		const res = await axios.get(BASEURL + "user/wishlist", {
			headers: {
				Authorization: uid,
			},
		});

		return { wishlist: res.data.wishlist };
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});

export const updateWishlist = createAsyncThunk("user/updateWishlist", async ({ uid, product }) => {
	try {
		const res = await axios.post(
			BASEURL + "user/wishlist",
			{
				productId: product._id,
			},
			{
				headers: {
					Authorization: uid,
				},
			}
		);
		return { product };
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
});

const wishlistSlice = createSlice({
	name: "wishlistState",

	initialState: {
		fetchState: "",
		wishlist: [],
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchWislist.pending, (state, action) => {
				state.fetchState = " fetching wishlist Items.....";
			})
			.addCase(fetchWislist.fulfilled, (state, action) => {
				state.fetchState = "Fetched";
				state.wishlist = action.payload.wishlist;
			})
			.addCase(fetchWislist.rejected, (state, action) => {
				state.fetchState = "Error while Fetching wishlist.....";
			})
			.addCase(updateWishlist.fulfilled, (state, action) => {
				const index = state.wishlist.findIndex((wishlistItem) => {
					return wishlistItem._id === action.payload.product._id;
				});

				if (index === -1) {
					state.wishlist.push(action.payload.product);
				} else {
					state.wishlist.splice(index, 1);
				}
			});
	},
});

export default wishlistSlice.reducer;
