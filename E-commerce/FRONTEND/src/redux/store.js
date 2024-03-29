import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.js";
import cartProductsReducer from "./cartProductsSlice.js";
import userReducer from "./userSlice.js";
import orderProductsReducer from "./orderProductsSlice.js";
import wishlistReducer from "./wishlist.js";
const store = configureStore({
	reducer: {
		products: productsReducer,
		cartProducts: cartProductsReducer,
		user: userReducer,
		wishlistState: wishlistReducer,
		orderProducts: orderProductsReducer,
	},
});

export default store;
