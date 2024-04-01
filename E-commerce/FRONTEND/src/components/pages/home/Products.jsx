import HomeProductCard from "./homeProductCard";
import { useSelector } from "react-redux";

export default function Products() {
	const categorizedProducts = useSelector((store) => {
		return store.products.categorizedProducts;
	});

	return (
		<div className="productsPage">
			{categorizedProducts.map((category, index) => {
				return (
					<div key={index} className="category">
						<h3 style={{ textAlign: "center", textTransform: "capitalize" }}>{category._id}</h3>

						<div style={{ display: "flex", overflow: "auto" }}>
							{category.product.map((product, index) => {
								return <HomeProductCard product={product} key={index} />;
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
