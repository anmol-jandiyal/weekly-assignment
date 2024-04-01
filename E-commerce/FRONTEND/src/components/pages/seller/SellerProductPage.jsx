import { useSelector } from "react-redux";
import SellerProductCard from "./sellerProductCard";

export default function SellerProductsPage() {
	const products = useSelector((store) => {
		return store.seller.productsSell;
	});

	return (
		<div className="SellerProductPage">
			<h1 style={{ textAlign: "center" }}>Your Products</h1>
			<div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
				{products.map((product, index) => {
					return <SellerProductCard product={product} key={index} />;
				})}
			</div>
		</div>
	);
}
