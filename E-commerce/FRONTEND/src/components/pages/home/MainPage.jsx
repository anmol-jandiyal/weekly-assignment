import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./navbar";
// import { setProducts } from "../../../redux/productsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/productsSlice";
import { fetchCartProducts, exportCartProducts } from "../../../redux/cartProductsSlice";
import { fetchOrderProducts } from "../../../redux/orderProductsSlice";
import { fetchWislist } from "../../../redux/wishlist";

export default function MainPage() {
	const navigate = useNavigate();
	const uid = useSelector((store) => {
		return store.user.uid;
	});
	const cartProducts = useSelector((store) => {
		return store.cartProducts;
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (uid) {
			dispatch(fetchProducts());
			dispatch(fetchCartProducts(uid));
			dispatch(fetchOrderProducts(uid));
			dispatch(fetchWislist(uid));
		}
	}, [uid]);

	useEffect(() => {
		if (uid && cartProducts.cartProductsArray.length !== 0) {
			//on mounting cartProducts is empty
			dispatch(exportCartProducts({ uid: uid, cartItems: cartProducts.cartProductsArray, totalPrice: cartProducts.totalPrice }));
		}
	}, [cartProducts]);

	useEffect(() => {
		if (!uid) {
			navigate("/login");
		}
	}, []);

	return uid ? (
		<div>
			<NavBar />
			<Outlet />
		</div>
	) : (
		<div>
			<h1>Please login before you access mainPage</h1>
		</div>
	);
}
