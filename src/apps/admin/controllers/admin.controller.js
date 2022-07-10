const { BaseController } = require("flow-express/general/BaseController");
const { errorResponse } = require("flow-express/general/base.response");
const { AdminRegisteredModels } = require("../models");
const { sequelize } = require("../../../config/db.config");
// const { verifyUserIsAdmin } = require("../../../utils/jwt");

const successMessage = { message: "success" };
class AdminController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const { model_name } = req.query;
			const model = await AdminRegisteredModels.findOne({
				where: { model_name },
			});
			const newInsert = Object.values(req.body).join(",");

			await sequelize.query(
				`INSERT INTO ${model.model_name} VALUES (${newInsert})`,
			);
			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			const adminModels = await AdminRegisteredModels.findAll({});
			res.status(200).json(adminModels);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getOne(req, res) {
		try {
			const { model_name } = req.params;
			const model = await AdminRegisteredModels.findOne({
				where: { model_name },
			});
			const modelRecords = await sequelize.query(
				`SELECT * FROM ${model.model_name}`,
			);
			res.json(modelRecords);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async put(req, res) {
		try {
			const { id } = req.query;
			res.json(successMessage);
			let query = "";
			Object.entries(req.body).forEach(
				(keyVal) => (query += `${keyVal[0]}=${keyVal[1]}`),
			);

			const updatedData = await sequelize.query(
				`UPDATE FROM ${model_.model_name} SET ${query} WHERE id=${id}`,
			);

			return res.json(updatedData);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async delete_(req, res) {
		try {
			const { id } = req.params;
			const model = AdminRegisteredModels.findOne({
				where: { model_name: req.params.model_name },
			});
			if (!model) throw new Error("Model not registered");

			sequelize.query(`DELETE FROM ${model.model_name} WHERE id=${id}`);
			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}
}

module.exports = AdminController;
