const { BaseController } = require("flow-express/general/BaseController");
const { errorResponse } = require("flow-express/general/base.response");
const { AppTranslation } = require("./models");
const { DbHelperOption } = require("../db-helpers/models");

const successMessage = { message: "success" };
class ApptranslationsController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			const appTranslation = await AppTranslation.findAll({
				where: req.query,
			});
			res.status(200).json(appTranslation);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getOne(req, res) {
		try {
			const { language_code } = req?.query;
			const language_id = (
				await DbHelperOption.findOne({
					where: { code: language_code || null },
				})
			)?.id;
			if (!language_id) throw new Error("Language code not found");
			const appLanguage = await AppTranslation.findOne({
				where: { language_id },
			});
			res.json({
				...appLanguage.dataValues,
				jsonContent: JSON.parse(appLanguage.dataValues.jsonContent),
			});
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

module.exports = ApptranslationsController;
