import { useReducer } from "react";

import { useNavigate } from "react-router-dom";
import { userSignup } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";

const initialState = { password: "", confirmPassword: "", name: "", email: "", mismatchStyle: "", privilege: "user" };

function reducer(state, action) {
	state.mismatchClass = "";

	switch (action.type) {
		case "CHANGE_NAME":
			return { ...state, name: action.payload };

		case "CHANGE_USERNAME":
			return { ...state, userName: action.payload };

		case "CHANGE_PASSWORD":
			return { ...state, password: action.payload };

		case "CHANGE_CONF_PASSWORD":
			if (state.password !== action.payload) {
				return { ...state, confirmPassword: action.payload, mismatchClass: "wrongPassword" };
			} else {
				return { ...state, confirmPassword: action.payload };
			}
		case "CHANGE_PRIVILEGE":
			return { ...state, privilege: action.payload };

		default:
			return state;
	}
}

export default function SignUp() {
	const navigate = useNavigate();
	const dispatchRedux = useDispatch();

	const [signUpData, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault();
					dispatchRedux(userSignup({ signUpData: signUpData, navigate: navigate }));
					// submitHandler(e, signUpData, setMessage, navigate);
				}}>
				<input
					type="text"
					placeholder="Name"
					onChange={(e) => {
						dispatch({ type: "CHANGE_NAME", payload: e.target.value });
					}}
				/>

				<input
					type="text"
					placeholder="User Name"
					onChange={(e) => {
						dispatch({ type: "CHANGE_USERNAME", payload: e.target.value });
					}}
				/>

				<input
					type="text"
					placeholder="Password"
					onChange={(e) => {
						dispatch({ type: "CHANGE_PASSWORD", payload: e.target.value });
					}}
				/>
				<input
					type="text"
					placeholder="confirmPassword"
					name="confirmPassword"
					className={signUpData.mismatchClass}
					onChange={(e) => {
						dispatch({ type: "CHANGE_CONF_PASSWORD", payload: e.target.value });
					}}
				/>
				<select
					name="privilege"
					id="privilege"
					onChange={(e) => {
						dispatch({ type: "CHANGE_PRIVILEGE", payload: e.target.value });
					}}>
					<option value="user">User</option>
					<option value="seller">Seller</option>
					<option value="admin">Admin</option>
				</select>
				<button>Submit</button>
			</form>
		</div>
	);
}
