import { useDispatch, useSelector } from "react-redux";
import { updateWishlist } from "../../../redux/wishlist";
import { addProductToCart } from "../../../redux/cartProductsSlice";

export default function WishlistCard({ product }) {
	const dispatch = useDispatch();
	const uid = useSelector((store) => {
		return store.user.uid;
	});

	return (
		<div className="wishlistCard" style={{ width: "300px", display: "flex", flexDirection: "column", padding: "10px", gap: "30px", border: "2px black solid", margin: "3px" }}>
			<div style={{ alignSelf: "center" }}>
				<img src={product.thumbnail} alt="" />
			</div>
			<div style={{ display: "flex", justifyContent: "space-evenly", flexBasis: "100%", alignItems: "center" }}>
				<div>
					<h3>{product.title}</h3>
					<h2>Rs{product.price}</h2>
				</div>
				<button
					onClick={() => {
						dispatch(updateWishlist({ uid: uid, product: product }));
					}}>
					Remove
				</button>
				<button
					disabled={product.stock === 0 ? true : false}
					onClick={() => {
						dispatch(addProductToCart({ uid: uid, product: product }));
					}}>
					Add to cart
				</button>
			</div>
		</div>
	);
}
