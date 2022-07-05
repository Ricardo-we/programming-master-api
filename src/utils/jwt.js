const jwt = require("jsonwebtoken");
const { UsersModel, Profile } = require("../apps/users/models");
require("dotenv").config();

const createToken = (payload) => {
	const token = jwt.sign({ name: payload }, process.env.API_SECRET_KEY);
	return token;
};

const verifyToken = (req) => {
	const token =
		req.headers["x-authorization"] ||
		req.body.token ||
		req.headers["authorization"]?.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.API_SECRET_KEY);
	return { decodedToken, token };
};

const verifyUserToken = async (req, checkProfile = false) => {
	const { decodedToken, token } = verifyToken(req);
	const user = await UsersModel.findOne({
		where: {
			token,
		},
	});
	if (!user) throw new Error("Invalid token");
	if (checkProfile) {
		const profile = await Profile.findOne({
			where: {
				user_id: user.id,
			},
		});
		return { user, profile };
	}
	return user;
};

module.exports = {
	verifyUserToken,
	createToken,
};
