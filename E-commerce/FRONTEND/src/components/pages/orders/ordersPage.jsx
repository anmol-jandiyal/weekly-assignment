import React from "react";
import { useSelector } from "react-redux";
import OrderCard from "./orderCard";

export default function OrdersPage() {
	const orders = useSelector((store) => {
		return store.orderProducts.orders;
	});

	return (
		<div className="orderPage">
			{orders.length === 0 ? (
				<h1 style={{ textAlign: "center", color: "gray" }}>NO Order Have Been Placed Yet</h1>
			) : (
				<div>
					{" "}
					<h1 style={{ textAlign: "center" }}>Your Orders</h1>
					{orders.map((order, index) => {
						return <OrderCard order={order} key={index} />;
					})}
				</div>
			)}
		</div>
	);
}
