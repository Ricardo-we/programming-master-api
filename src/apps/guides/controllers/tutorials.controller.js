const { Tutorials, GuidesModel, ProgrammingLanguages } = require("../models");
const { BaseController } = require("flow-express/general/BaseController");
const { errorResponse } = require("flow-express/general/base.response");
const { Op } = require("sequelize");
const { verifyUserToken } = require("../../../utils/jwt");

class TutorialsController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const userFullProfile = await verifyUserToken(req, true);
			if (userFullProfile?.profile?.plan !== "admin") {
				throw new Error("Only administrators can change this");
			}

			const { guide_id, md_body } = req.body;
			const newTutorial = await Tutorials.create({
				guide_id,
				md_body,
			});
			res.json(newTutorial);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			const tutorials = await Tutorials.findAll({});
			res.status(200).json(tutorials);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			const tutorial = await Tutorials.findOne({ where: { id } });
			const guide = await GuidesModel.findOne({
				where: { id: tutorial.guide_id },
				include: ProgrammingLanguages,
			});
			res.json({ guide, tutorial });
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async put(req, res) {
		try {
			const userFullProfile = await verifyUserToken(req, true);
			if (userFullProfile.profile.plan === "admin")
				throw new Error("Only administrators have access");
			const { id } = req.params;
			const { md_body } = req.body;
			const programmingLanguage = await ProgrammingLanguages.update(
				{
					md_body,
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
			await Tutorials.destroy({ where: { id } });
			res.json(successMessage);
		} catch (error) {
			errorResponse(error, res);
		}
	}
}

module.exports = TutorialsController;
