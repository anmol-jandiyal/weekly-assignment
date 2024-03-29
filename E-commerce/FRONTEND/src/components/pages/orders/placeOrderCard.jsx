export default function PlaceOrderCard({ productDetails }) {
	const { product, count } = productDetails;

	return (
		<div className="orderProductCard">
			<div>
				<img src={product.thumbnail} alt="" />
			</div>
			<div>
				<div>
					<h2>{product.title}</h2>
					<h4 style={{ color: "gray" }}>Rs. {product.price}</h4>
				</div>
			</div>
			<h3 style={{ justifySelf: "end" }}>x {count}</h3>
		</div>
	);
}
