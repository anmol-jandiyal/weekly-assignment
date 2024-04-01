import { NavLink, useNavigate } from "react-router-dom";
import { RiShoppingCart2Fill, RiSearch2Line, RiHome7Line } from "@remixicon/react";
import { userLogOut } from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function activeTab({ isActive }) {
	return isActive ? "activeTab" : "";
}
export default function NavBar() {
	const navigate = useNavigate();
	const privilege = useSelector((store) => {
		return store.user.privilege;
	});

	const dispatch = useDispatch();

	return (
		<div className="navBar">
			<NavLink to="/mainPage/ordersPage" className={activeTab}>
				My Orders
			</NavLink>
			<NavLink to="/mainPage/wishlistPage" className={activeTab}>
				Wishlist
			</NavLink>
			<NavLink to="/mainPage/searchProducts" className={activeTab}>
				<RiSearch2Line />
			</NavLink>
			<NavLink to="/mainPage/home" className={activeTab}>
				<RiHome7Line />
			</NavLink>
			<NavLink to="/mainPage/cart" className={activeTab}>
				<RiShoppingCart2Fill />
			</NavLink>

			{privilege === "seller" ? (
				<NavLink to="/mainPage/seller" className={activeTab}>
					Seller Page
				</NavLink>
			) : (
				<></>
			)}
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
