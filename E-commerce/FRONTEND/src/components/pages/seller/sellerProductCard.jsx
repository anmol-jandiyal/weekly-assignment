import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine, RiPencilLine } from "@remixicon/react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { deleteProducts } from "../../../redux/sellerSlice";

export default function SellerProductCard({ product }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { setNewProductDetails } = useOutletContext();

	const uid = useSelector((store) => {
		return store.user.uid;
	});

	return (
		<div className="productCard" style={{ flexShrink: "0", flexDirection: "column", width: "300px" }}>
			<div>
				<img src={product.thumbnail} alt="" />
			</div>

			<div>
				<h3>{product.title}</h3>
				<h2>Rs. {product.price}</h2>
			</div>
			<div style={{ display: "flex", gap: "40px", margin: "5px" }}>
				<button
					onClick={() => {
						setNewProductDetails(product);
						navigate("/mainPage/seller/products/edit");
					}}>
					<RiPencilLine />
				</button>

				<button
					onClick={() => {
						dispatch(deleteProducts({ productId: product._id, uid: uid }));
					}}>
					<RiDeleteBinLine />
				</button>
			</div>

			<p>{product.description}</p>
			<h4 style={{ color: product.stock <= 0 ? "red" : "blue" }}>stock : {product.stock}</h4>
		</div>
	);
}
