const { BaseController } = require("flow-express/general/BaseController");
const { errorResponse } = require("flow-express/general/base.response");
const { AdminUser, AdminRegisteredModels } = require("../models");
const admin = require("../admin-utils");
const bcrypt = require("bcrypt");
const { createToken, verifyToken } = require("../../../utils/jwt");

const successMessage = { message: "success" };
class AdminUsersController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const { model_name } = req.query;

			res.json(newInsert);
		} catch (error) {
			console.error(error);
			errorResponse(error, res);
		}
	}

	async authenticate(req, res) {
		try {
			const { username, password } = req.body;
			const user = await AdminUser.findOne({ where: { username } });

			if (!user) throw new Error("Invalid username");
			if (!bcrypt.compareSync(password, user.password))
				throw new Error("Invalid password");
			const token = createToken(user);

			res.status(200).json({ token });
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			// const adminModels = await AdminRegisteredModels.findAll({});

			// res.status(200).json(adminModels);
			const fields = [
				{ name: "username", type: "text", placeholder: "Username" },
				{ name: "password", type: "password", placeholder: "Password" },
			];
			res.render("admin/login", { fields, error: req?.query?.errors });
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getOne(req, res) {
		try {
			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async put(req, res) {
		try {
			const { model_name } = req.params;
			const { id } = req.query;

			const model = await AdminRegisteredModels.findOne({
				where: { model_name },
			});

			const updatedData = await admin.models[model.model_name].update(
				req.body,
				{ where: { id } },
			);

			return res.json(updatedData);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async delete_(req, res) {
		try {
			const { id } = req.query;
			const model = AdminRegisteredModels.findOne({
				where: { model_name: req.params.model_name },
			});
			if (!model) throw new Error("Model not registered");
			await admin.models[model.model_name].destroy({ where: { id } });

			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async deleteRegisteredModel(req, res) {
		try {
			const { id } = req.params;
			await AdminRegisteredModels.destroy({ where: { id } });
			return successMessage;
		} catch (error) {
			errorResponse(error, res);
		}
	}
}

module.exports = AdminUsersController;
