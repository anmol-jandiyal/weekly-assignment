import { useSelector } from "react-redux";
import SellerPlacedOrderCard from "./PlacedOrderCard";

export default function SellerPlacedOrderPage() {
	const orders = useSelector((store) => {
		return store.seller.placedOrders;
	});

	return (
		<div className="SellerProductPage">
			<h1 style={{ textAlign: "center" }}>Products Purchased</h1>
			<div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
				{orders.map((order, index) => {
					return <SellerPlacedOrderCard order={order} key={index} />;
				})}
			</div>
		</div>
	);
}
