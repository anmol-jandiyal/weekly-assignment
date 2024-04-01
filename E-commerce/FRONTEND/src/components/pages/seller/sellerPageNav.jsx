import { NavLink } from "react-router-dom";
import { RiShoppingCart2Fill, RiSearch2Line, RiHome7Line } from "@remixicon/react";

function activeTab({ isActive }) {
	return isActive ? "activeTab" : "";
}
export default function SellerPageNavBar() {
	return (
		<div className="navBar">
			<NavLink to="/mainPage/seller/addProducts" className={activeTab}>
				Add Product
			</NavLink>
			<NavLink to="/mainPage/seller/orders" className={activeTab}>
				Orders
			</NavLink>
			<NavLink to="/mainPage/seller/products" className={activeTab}>
				Product
			</NavLink>
		</div>
	);
}
