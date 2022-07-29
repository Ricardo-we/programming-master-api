const { ProgrammingLanguages, GuidesModel } = require("../models");
const { DbHelperOption } = require("../../db-helpers/models");
const { BaseController } = require("flow-express/general/BaseController");
const { errorResponse } = require("flow-express/general/base.response");
const { Op } = require("sequelize");
const { verifyUserToken } = require("../../../utils/jwt");

const successMessage = { message: "success" };
class GuidesController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const userFullProfile = await verifyUserToken(req, true);
			if (userFullProfile.profile.plan !== "admin")
				throw new Error("Only administrators can change this");

			const { language_code } = req.body;
			const language_id = await DbHelperOption.findOne({
				where: { code: language_code },
			});

			const newLanguage = await ProgrammingLanguages.create({
				...req.body,
				language_id: language_id.id,
			});
			res.json(newLanguage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			const { language_code } = req.query;

			const language_id = await DbHelperOption.findOne({
				where: { code: language_code || null },
			});

			const filterParams = language_id
				? { language_id: language_id?.id, ...req.params }
				: {};

			const programmingLanguages = await ProgrammingLanguages.findAll({
				where: filterParams,
			});
			res.status(200).json(programmingLanguages);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getProgrammingLanguageGuides(req, res) {
		try {
			const { id } = req.params;
			const programming_language = await ProgrammingLanguages.findOne({
				where: { id },
			});
			const guides = await GuidesModel.findAll({
				where: { programming_language_id: id },
			});
			return res.json({ programming_language, guides });
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			const params = { where: { [Op.or]: [{ name: id }, { id }] } };
			const programmingLanguage = await ProgrammingLanguages.findOne(
				params,
			);
			res.json(programmingLanguage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async put(req, res) {
		try {
			const userFullProfile = await verifyUserToken(req, true);
			if (userFullProfile.profile.plan !== "admin")
				throw new Error("Only administrators have access");
			const { id } = req.params;
			const { name, description, is_framework, extension_name } =
				req.body;
			const programmingLanguage = await ProgrammingLanguages.update(
				{
					name,
					description,
					is_framework,
					extension_name,
				},
				{ where: { id } },
			);
			res.json(programmingLanguage);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async delete_(req, res) {
		try {
			const userFullProfile = await verifyUserToken(req, true);
			if (userFullProfile?.profile?.plan === "admin")
				throw new Error("Only administrators have access");
			const { id } = req.params;
			await ProgrammingLanguages.destroy({ where: { id } });
			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}
}

module.exports = GuidesController;
