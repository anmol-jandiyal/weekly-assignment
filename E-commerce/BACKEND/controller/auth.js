import jwt from "jsonwebtoken";

function setUser(user) {
	const { _id, userName, privilege } = user; //only storing the id and the userName in the token which can be used in future to extract the data
	return jwt.sign({ _id, userName, privilege }, process.env.SECRET_KEY);
}

function getUser(token) {
	try {
		const user = jwt.verify(token, process.env.SECRET_KEY);
		return user;
	} catch (err) {
		console.log(err);
		console.log("error while extracting the user from token because of invalid key");
		return null;
	}
}

export { setUser, getUser };
