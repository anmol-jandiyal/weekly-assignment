import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_URL;
export const userLogin = createAsyncThunk("user/Login", async ({ loginData, navigate, currentUid }) => {
	try {
		const res = await axios.post(BASEURL + "users/login", loginData, {
			headers: {
				Authorization: currentUid,
			},
			withCredentials: true,
		});

		console.log(res.data);

		navigate("/mainPage");
		return res.data;
	} catch (err) {
		console.log(err);
		alert("Invalid userName and Password");
		return Promise.reject({ error: err });
	}
});

export const userSignup = createAsyncThunk("user/Signup", async ({ signUpData, navigate }) => {
	if (signUpData.password.length < 8) {
		alert("Password length must be greater than 8");
		return Promise.reject({ error: "Password Length Must Be Greater Than 8" });
	}
	if (signUpData.userName && signUpData.password === signUpData.confirmPassword && signUpData.name) {
		// delete signUpData.confirmPassword;

		try {
			const response = await axios.post(BASEURL + "users/signup", signUpData);
			navigate("/login");
			return response.data;
		} catch (err) {
			console.log("error while signing upd", err);
			alert(err.response.data.error);
			return Promise.reject({ error: err });
		}
	}
	return Promise.reject({ error: "Error" });
});

const userSlice = createSlice({
	name: "user",

	initialState: {
		privilege: "user",
		loginSignupStatus: "",
		uid: null,
	},
	reducers: {
		userLogOut: (state, action) => {
			state.uid = null;

			localStorage.removeItem("uid");
			localStorage.removeItem("privilege");
		},

		setUser: (state, action) => {
			const { uid, privilege } = action.payload;
			state.uid = uid;
			state.privilege = privilege;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.pending, (state, action) => {
				state.loginSignupStatus = "Logging In................";
			})
			.addCase(userLogin.fulfilled, (state, action) => {
				state.uid = action.payload.user.uid;
				state.privilege = action.payload.user.privilege;
				state.loginSignupStatus = action.payload.message;
				localStorage.setItem("uid", action.payload.user.uid);
				localStorage.setItem("privilege", action.payload.user.privilege);
			})

			.addCase(userLogin.rejected, (state, action) => {
				state.loginSignupStatus = "login rejected";
			})
			.addCase(userSignup.pending, (state, action) => {
				state.loginSignupStatus = "Signing Up..............";
			})
			.addCase(userSignup.fulfilled, (state, action) => {
				state.loginSignupStatus = "Successful Signup";
			})
			.addCase(userSignup.rejected, (state, action) => {
				state.loginSignupStatus = "signup error";
			});
	},
});

export default userSlice.reducer;
export const { setUser, userLogOut } = userSlice.actions;
