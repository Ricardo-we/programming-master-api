const { GuidesModel, Tutorials } = require("./models");
const { BaseController } = require("flow-express/general/BaseController");
const { errorResponse } = require("flow-express/general/base.response");
const { verifyUserToken } = require("../../utils/jwt");

const successMessage = { message: "success" };
class GuidesController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const fullUser = await verifyUserToken(req, true);
			const data = req.body;
			if (fullUser.profile.plan !== "admin")
				throw new Error("Only admin user can create guides");
			const guide = await GuidesModel.create({
				programming_language_id: data.programming_language_id,
				pro_only: data.pro_only,
				title: data.title,
				introduction: data.introduction,
			});
			return res.json(guide);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			const guides = await GuidesModel.findAll({
				where: {
					pro_only: req.params.pro_user || false,
				},
			});
			res.status(200).json(guides);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async getGuideTutorials(req, res) {
		try {
			const { id } = req.params;
			const guide = await GuidesModel.findOne({ where: { id } });
			const tutorials = await Tutorials.findAll({
				where: { guide_id: id },
				attributes: ["id", "title"],
			});
			return res.json({ guide, tutorials });
		} catch (error) {
			return errorResponse(error, res);
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params;
			const guides = await GuidesModel.findOne({
				where: { id },
			});
			res.json(guides);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async put(req, res) {
		try {
			const fullUser = await verifyUserToken(req, true);
			if (fullUser.profile.plan !== "admin")
				throw new Error("Only admins can change guides");
			const { id } = req.params;
			const { pro_only, title, introduction, programming_language_id } =
				req.body;
			const guide = await GuidesModel.update(
				{ pro_only, title, introduction, programming_language_id },
				{
					where: {
						id,
					},
				},
			);
			return res.json(guide);
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

module.exports = GuidesController;
