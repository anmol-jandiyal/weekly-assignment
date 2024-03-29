import CartProductCard from "./cartProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Cart() {
	const cartProducts = useSelector((store) => {
		return store.cartProducts;
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const uid = useSelector((store) => {
		return store.user.uid;
	});

	return (
		<div className="homePage">
			{cartProducts.cartProductsArray.map((productDetails, index) => {
				return <CartProductCard productDetails={productDetails} key={index} />;
			})}

			{cartProducts.totalPrice === 0 ? (
				<h1 style={{ textAlign: "center", color: "gray" }}>No Product In Cart</h1>
			) : (
				<div className="totalPrice" style={{ display: "flex", justifyContent: "space-evenly", padding: "30px", border: "2px double black" }}>
					<h1>Total Cart Price</h1>
					<h1>{cartProducts.totalPrice}</h1>

					<button
						onClick={() => {
							navigate("/mainPage/placeOrderPage");
						}}>
						Place Order
					</button>
				</div>
			)}
		</div>
	);
}
