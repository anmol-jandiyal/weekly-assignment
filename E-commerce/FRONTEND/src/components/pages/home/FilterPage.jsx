import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts } from "../../../redux/productsSlice";
import HomeProductCard from "./homeProductCard";

export default function FilterPage() {
	const filteredProducts = useSelector((store) => {
		return store.products.filteredProducts;
	});
	const dispatch = useDispatch();

	return (
		<div>
			<div style={{ borderBottom: "2px solid black", margin: "30px" }}>
				<form
					style={{ display: "flex", flexDirection: "row", maxWidth: "none", justifyContent: "flex-end", margin: "10px" }}
					action=""
					onSubmit={(e) => {
						e.preventDefault();

						const fd = new FormData(e.target);
						dispatch(fetchFilteredProducts({ filterBy: fd.get("filterBy"), value: fd.get("value") }));
					}}>
					<select name="filterBy" id="filterBy">
						<option value="category">Category</option>
						<option value="name">Name</option>
					</select>

					<input type="text" placeholder="Serach" name="value" />
					<button>Search</button>
				</form>
			</div>

			<div>
				{filteredProducts.map((product, index) => {
					return <HomeProductCard key={index} product={product} />;
				})}
			</div>
		</div>
	);
}
