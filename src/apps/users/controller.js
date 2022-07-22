const { BaseController } = require("flow-express/general/BaseController");
const { errorResponse } = require("flow-express/general/base.response");
const { verifyUserToken, createToken } = require("../../utils/jwt");
const { UsersModel, Profile } = require("./models");
const { DbHelperOption } = require("../db-helpers/models");
const { Op } = require("sequelize");

const successMessage = { message: "success" };
class UsersController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const { email, language_code } = req.body;
			const token = createToken(email);
			const language_id = (
				await DbHelperOption.findOne({
					where: {
						code: {
							[Op.or]: [language_code || null, "ES"],
						},
					},
				})
			).id;
			const user = await UsersModel.create({
				...req.body,
				token,
				language_id,
			});
			await Profile.create({ user_id: user.id, plan: "admin" });

			res.json({ email, language_code, token: user.token });
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
			if (!user) throw new Error("Invalid credentials");
			user.token = createToken(user?.email);
			await user.save();

			const language_code = await DbHelperOption.findOne({
				where: { id: user.language_id },
			});

			return res.json({ email, language_code, token: user.token });
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
