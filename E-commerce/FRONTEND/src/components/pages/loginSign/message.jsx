import { useSelector } from "react-redux";

export default function Message() {
	const message = useSelector((store) => {
		return store.user.loginSignupStatus;
	});

	return (
		<div className="message" style={{ color: "red", textAlign: "center" }}>
			{message}
		</div>
	);
}
