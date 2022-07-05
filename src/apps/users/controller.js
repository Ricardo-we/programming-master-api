const { BaseController } = require("flow-express/general/BaseController");
const { errorResponse } = require("flow-express/general/base.response");
const { verifyUserToken, createToken } = require("../../utils/jwt");
const { UsersModel, Profile } = require("./models");

const successMessage = { message: "success" };
class UsersController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const { fullname, email, password } = req.body;
			const token = createToken(email);
			const user = await UsersModel.create({
				fullname,
				email,
				password,
				token,
			});
			await Profile.create({ user_id: user.id, plan: "basic" });
			res.json({ token: user.token });
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async authenticate(req, res) {
		try {
			const { email, password } = req.body;
			const user = await UsersModel.findOne({
				where: { email, password },
			});
			user.token = createToken(user.email);
			await user.save();
			return res.json({ token: user.token });
		} catch (error) {
			return errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			res.status(200).json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async put(req, res) {
		try {
			const { id } = req.params;
			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async delete_(req, res) {
		try {
			const { id } = req.params;
			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}
}

module.exports = UsersController;
