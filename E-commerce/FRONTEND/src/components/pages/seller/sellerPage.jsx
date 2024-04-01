import { Outlet } from "react-router-dom";
import SellerPageNavBar from "./sellerPageNav";

export default function SellerPage() {
	return (
		<div>
			<SellerPageNavBar />
			<Outlet />
		</div>
	);
}
