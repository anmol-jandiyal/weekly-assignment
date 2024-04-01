import { useDispatch, useSelector } from "react-redux";
import PlaceOrderCard from "./placeOrderCard";
import { exportCartProducts } from "../../../redux/cartProductsSlice";
import { exportOrderDetails } from "../../../redux/orderProductsSlice";

export default function PlaceOrderPage() {
	const cart = useSelector((store) => {
		return store.cartProducts;
	});

	const dispatch = useDispatch();

	const uid = useSelector((store) => {
		return store.user.uid;
	});

	return (
		<div className="orderPage">
			{cart.totalPrice === 0 ? (
				<h1 style={{ textAlign: "center", color: "gray" }}>Thanks For Ordering</h1>
			) : (
				<div>
					{" "}
					<h1 style={{ textAlign: "center" }}>Items to checkout</h1>
					{cart.cartProductsArray.map((productDetails, index) => {
						return <PlaceOrderCard productDetails={productDetails} key={index} />;
					})}
					<div className="totalPrice" style={{ display: "flex", justifyContent: "space-evenly", padding: "30px", border: "2px double black" }}>
						<h1>Total Order Price</h1>
						<h1>{cart.totalPrice}</h1>

						<button
							onClick={(e) => {
								e.preventDefault();
								dispatch(exportOrderDetails({ uid: uid, cartItems: cart.cartProductsArray, totalPrice: cart.totalPrice, dispatch }));
								dispatch(exportCartProducts({ uid: uid, cartItems: [], totalPrice: 0, cartUpdated: false }));
							}}>
							Order
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
