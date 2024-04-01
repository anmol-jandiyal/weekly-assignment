import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../redux/userSlice";

const initialLogin = { userName: "", password: "", privilege: "user" };

function reducer(state, action) {
	switch (action.type) {
		case "CHANGE_USER_NAME":
			return { ...state, userName: action.payload };

		case "CHANGE_PASSWORD":
			return { ...state, password: action.payload };
		case "CHANGE_PRIVILEGE":
			return { ...state, privilege: action.payload };

		default:
			return state;
	}
}

export default function Login() {
	const [loginData, dispatchLoginData] = useReducer(reducer, initialLogin);
	const currentUid = useSelector((store) => {
		return store.user.uid;
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<div>
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(userLogin({ loginData: loginData, currentUid: currentUid, navigate: navigate }));
					// submitHandler(loginData, dispatch, navigate);
				}}>
				<input
					type="text"
					placeholder="User Name"
					onChange={(e) => {
						dispatchLoginData({ type: "CHANGE_USER_NAME", payload: e.target.value });
					}}
				/>
				<input
					type="text"
					placeholder="Password"
					onChange={(e) => {
						dispatchLoginData({ type: "CHANGE_PASSWORD", payload: e.target.value });
					}}
				/>

				<select
					name="privilege"
					onChange={(e) => {
						dispatchLoginData({ type: "CHANGE_PRIVILEGE", payload: e.target.value });
					}}>
					<option value="user">User</option>
					<option value="seller">Seller</option>
				</select>
				<button>Submit</button>
			</form>
		</div>
	);
}
