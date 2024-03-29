import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../../redux/cartProductsSlice";
import { updateWishlist } from "../../../redux/wishlist";

export default function HomeProductCard({ product }) {
	const dispatch = useDispatch();
	const uid = useSelector((store) => {
		return store.user.uid;
	});

	return (
		<div className="productCard">
			<div>
				<img src={product.thumbnail} alt="" />
			</div>
			<div>
				<div>
					<h3>{product.title}</h3>
					<h2>Rs. {product.price}</h2>
				</div>
				<div style={{ display: "flex", gap: "40px", margin: "5px" }}>
					<button
						onClick={() => {
							dispatch(addProductToCart({ product: { ...product } }));
						}}>
						Add To Cart
					</button>

					<button
						onClick={() => {
							dispatch(updateWishlist({ product: product, uid: uid }));
						}}>
						wishlist
					</button>
				</div>
			</div>
			<p>{product.description}</p>
		</div>
	);
}
