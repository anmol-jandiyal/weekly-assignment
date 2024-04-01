import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sellerProductAddition } from "../../../redux/sellerSlice";
const initialState = { title: "", description: "", price: 0, discountPercentage: 0, stock: 0, brand: "", category: "", thumbnail: "", images: [] };

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

export default function AddProductsPage() {
	const navigate = useNavigate();
	const dispatchRedux = useDispatch();
	const uid = useSelector((store) => store.user.uid);

	const [productDetails, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault();
					dispatchRedux(sellerProductAddition({ productDetails: productDetails, navigate: navigate, uid }));
				}}>
				<input
					type="text"
					placeholder="title"
					onChange={(e) => {
						dispatch({ type: "CHANGE_TITLE", payload: e.target.value });
					}}
				/>
				<input
					type="text"
					placeholder="description"
					onChange={(e) => {
						dispatch({ type: "CHANGE_DESCRIPTION", payload: e.target.value });
					}}
				/>
				<input
					type="number"
					placeholder="price"
					onChange={(e) => {
						dispatch({ type: "CHANGE_PRICE", payload: e.target.value });
					}}
				/>
				<input
					type="number"
					min="0"
					max="100"
					placeholder="discountPercentage"
					onChange={(e) => {
						dispatch({ type: "CHANGE_DISCOUNT", payload: e.target.value });
					}}
				/>
				<input
					type="number"
					min="0"
					placeholder="stock"
					onChange={(e) => {
						dispatch({ type: "CHANGE_STOCK", payload: e.target.value });
					}}
				/>{" "}
				<input
					type="text"
					placeholder="brand"
					onChange={(e) => {
						dispatch({ type: "CHANGE_BRAND", payload: e.target.value });
					}}
				/>
				<input
					type="text"
					placeholder="Category"
					onChange={(e) => {
						dispatch({ type: "CHANGE_CATEGORY", payload: e.target.value });
					}}
				/>
				<input
					type="text"
					placeholder="enter thumbnail url"
					onChange={(e) => {
						dispatch({ type: "CHANGE_THUMBNAIL", payload: e.target.value });
					}}
				/>
				<button>Submit</button>
			</form>
		</div>
	);
}
