const jwt = require("jsonwebtoken");
const { AdminUser } = require("../apps/admin/models");
const { UsersModel, Profile } = require("../apps/users/models");
require("dotenv").config();

const createToken = (payload) => {
	const token = jwt.sign(payload, process.env.API_SECRET_KEY);
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
	try {
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
			return { ...user.dataValues, ...profile.dataValues };
		}

		return user;
	} catch (error) {
		return {};
	}
};

const verifyUserIsAdmin = async (req) => {
	const { decodedToken } = verifyToken(req);

	const adminUser = await AdminUser.findOne({
		where: { username: decodedToken.username },
	});

	if (adminUser.password !== decodedToken.password)
		throw new Error("Invalid credentials");

	return decodedToken;
};

module.exports = {
	verifyUserToken,
	createToken,
	verifyUserIsAdmin,
	verifyToken,
};
