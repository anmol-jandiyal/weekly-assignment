import HomeProductCard from "./homeProductCard";
import { useSelector } from "react-redux";

export default function Products() {
	const products = useSelector((store) => {
		return store.products.productsArray;
	});

	return (
		<div className="productsPage">
			{products.map((product, index) => {
				return <HomeProductCard product={product} key={index} />;
			})}
		</div>
	);
}
