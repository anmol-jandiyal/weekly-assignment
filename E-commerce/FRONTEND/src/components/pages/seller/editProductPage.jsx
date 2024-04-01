import { useReducer } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProductDetails } from "../../../redux/sellerSlice";

function reducer(state, action) {
	switch (action.type) {
		case "CHANGE_TITLE":
			return { ...state, title: action.payload };
		case "CHANGE_DESCRIPTION":
			return { ...state, description: action.payload };
		case "CHANGE_PRICE":
			return { ...state, price: +action.payload };
		case "CHANGE_DISCOUNT":
			return { ...state, discountPercentage: +action.payload };
		case "CHANGE_STOCK":
			return { ...state, stock: +action.payload };
		case "CHANGE_BRAND":
			return { ...state, brand: action.payload };
		case "CHANGE_CATEGORY":
			return { ...state, category: action.payload };
		case "CHANGE_THUMBNAIL":
			return { ...state, thumbnail: action.payload };

		default:
			return state;
	}
}

export default function EditProductPage() {
	const { newProductDetails } = useOutletContext();

	const navigate = useNavigate();

	const uid = useSelector((store) => store.user.uid);
	const dispatchRedux = useDispatch();

	const [productDetails, dispatch] = useReducer(reducer, newProductDetails);

	return (
		<div>
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault();
					dispatchRedux(editProductDetails({ productDetails: productDetails, navigate: navigate, uid: uid }));
				}}>
				<label htmlFor="title">
					Title:
					<input
						type="text"
						placeholder="title"
						defaultValue={productDetails.title}
						onChange={(e) => {
							dispatch({ type: "CHANGE_TITLE", payload: e.target.value });
						}}
					/>
				</label>
				<label htmlFor="description">
					Description:
					<input
						type="text"
						placeholder="description"
						defaultValue={productDetails.description}
						onChange={(e) => {
							dispatch({ type: "CHANGE_DESCRIPTION", payload: e.target.value });
						}}
					/>
				</label>
				<label htmlFor="Price">
					Price:
					<input
						type="number"
						placeholder="price"
						defaultValue={productDetails.price}
						onChange={(e) => {
							dispatch({ type: "CHANGE_PRICE", payload: e.target.value });
						}}
					/>
				</label>
				<label htmlFor="Discount">
					Discount:
					<input
						type="number"
						min="0"
						max="100"
						step={0.01}
						defaultValue={productDetails.discountPercentage}
						placeholder="discountPercentage"
						onChange={(e) => {
							dispatch({ type: "CHANGE_DISCOUNT", payload: e.target.value });
						}}
					/>
				</label>
				<label htmlFor="Stock">
					Stock:
					<input
						type="number"
						min="0"
						placeholder="stock"
						defaultValue={productDetails.stock}
						onChange={(e) => {
							dispatch({ type: "CHANGE_STOCK", payload: e.target.value });
						}}
					/>
				</label>
				<label htmlFor="Brand">
					Brand:
					<input
						type="text"
						placeholder="brand"
						defaultValue={productDetails.brand}
						onChange={(e) => {
							dispatch({ type: "CHANGE_BRAND", payload: e.target.value });
						}}
					/>
				</label>
				<label htmlFor="Category">
					Category:
					<input
						type="text"
						placeholder="Category"
						defaultValue={productDetails.category}
						onChange={(e) => {
							dispatch({ type: "CHANGE_CATEGORY", payload: e.target.value });
						}}
					/>
				</label>
				<label htmlFor="Thumbnail">
					Thumbnail:
					<input
						type="text"
						placeholder="enter thumbnail url"
						defaultValue={productDetails.thumbnail}
						onChange={(e) => {
							dispatch({ type: "CHANGE_THUMBNAIL", payload: e.target.value });
						}}
					/>
				</label>
				<button>Submit</button>
			</form>
		</div>
	);
}
