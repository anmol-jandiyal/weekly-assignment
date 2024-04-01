import { useSelector } from "react-redux";

export default function SellerPlacedOrderCard({ order }) {
	const { product, count, userName, date } = order;

	return (
		<div className="orderCard" style={{ flexShrink: "0", flexDirection: "column", alignItems: "stretch", width: "500px", padding: "40px" }}>
			<div style={{ display: "flex", gap: "30px", justifyContent: "space-between", borderBottom: "1px solid black" }}>
				<div>
					<img src={product.thumbnail} alt="" />
				</div>

				<div>
					<div>
						<h3>{product.title}</h3>
						<h2>Rs. {product.price}</h2>
					</div>

					<p>{product.description}</p>
				</div>
			</div>

			<div>No of Items: x {count}</div>
			<h4>User: {userName}</h4>
			<h4>Order Date: {new Date(date).toDateString()}</h4>
		</div>
	);
}
