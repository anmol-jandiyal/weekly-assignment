import { Outlet, useNavigate } from "react-router-dom";
import SignupLoginNavBar from "./signupLoginNavBar";
import Message from "./message";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import { useEffect } from "react";
export default function HomePage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const uid = localStorage.getItem("uid");
	const privilege = localStorage.getItem("privilege");

	dispatch(setUser({ uid: uid, privilege: privilege }));

	useEffect(() => {
		if (uid) navigate("/mainPage");
	}, []);

	return uid ? (
		<></>
	) : (
		<div className="homePage" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100svh", background: "rgb(202, 239, 202)" }}>
			<div style={{ background: "white", padding: "30px" }}>
				<SignupLoginNavBar />
				<Outlet />
				<Message />
			</div>
		</div>
	);
}
