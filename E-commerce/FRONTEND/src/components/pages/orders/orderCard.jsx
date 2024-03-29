export default function OrderCard({ order }) {
	const { items, totalPrice, date } = order;
	return (
		<div style={{ border: "solid 3px black", margin: "50px" }}>
			{items.map((item, index) => {
				return (
					<div className="orderProductCard" key={index}>
						<div>
							<img src={item.product.thumbnail} alt="" />
						</div>
						<div>
							<div>
								<h2>{item.product.title}</h2>
								<h4 style={{ color: "gray" }}>Rs. {item.product.price}</h4>
							</div>
						</div>
						<h3 style={{ justifySelf: "end" }}>x {item.count}</h3>
					</div>
				);
			})}
			<div style={{ display: "flex", justifyContent: "space-between", padding: "0 5px" }}>
				<h3>Date: {new Date(date).toDateString()} </h3>
				<h3>Total Price: {totalPrice} </h3>
			</div>
		</div>
	);
}
