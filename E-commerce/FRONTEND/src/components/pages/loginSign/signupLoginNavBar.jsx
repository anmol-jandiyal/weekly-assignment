import { NavLink } from "react-router-dom";

function actionFun(ctx) {
	const { isActive } = ctx;

	return isActive ? "active" : "";
}

export default function SignupLoginNavBar() {
	return (
		<nav style={{ display: "flex", gap: "30px", fontSize: "1.3rem" }}>
			<NavLink to="/signup" className={actionFun}>
				SignUp
			</NavLink>

			<NavLink to="/login" className={actionFun}>
				Login
			</NavLink>
		</nav>
	);
}
