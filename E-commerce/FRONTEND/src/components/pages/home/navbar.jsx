import { NavLink, useNavigate } from "react-router-dom";
import { RiShoppingCart2Fill } from "@remixicon/react";
import { userLogOut } from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { exportCartProducts } from "../../../redux/cartProductsSlice";

function activeTab({ isActive }) {
	return isActive ? "activeTab" : "";
}
export default function NavBar() {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	return (
		<div className="navBar">
			<NavLink to="/mainPage/products" className={activeTab}>
				Products
			</NavLink>
			<NavLink to="/mainPage/cart" className={activeTab}>
				<RiShoppingCart2Fill />
			</NavLink>
			<NavLink to="/mainPage/ordersPage" className={activeTab}>
				My Orders
			</NavLink>
			<NavLink to="/mainPage/wishlistPage" className={activeTab}>
				Wishlist
			</NavLink>
			<button
				onClick={() => {
					dispatch(userLogOut({}));
					navigate("/login");
				}}>
				LogOut
			</button>
		</div>
	);
}
