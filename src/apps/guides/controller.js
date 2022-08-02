const { GuidesModel, Tutorials } = require("./models");
const { BaseController } = require("flow-express/general/BaseController");
const { errorResponse } = require("flow-express/general/base.response");
const { verifyUserToken } = require("../../utils/jwt");
const { Op } = require("sequelize");

const successMessage = { message: "success" };
class GuidesController extends BaseController {
	constructor() {
		super();
	}

	async post(req, res) {
		try {
			const fullUser = await verifyUserToken(req, true);
			if (fullUser.profile.plan !== "admin")
				throw new Error("Only admin user can create guides");
			const guide = await GuidesModel.create(req.body);
			return res.json(guide);
		} catch (error) {
			errorResponse(error, res);
		}
	}

	async get(req, res) {
		try {
			const guides = await GuidesModel.findAll({
				where: {
					pro_only: {
						[Op.or]: [req?.user.plan === "pro", false],
					},
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
			console.log(req.user);
			const guide = await GuidesModel.findOne({
				where: { id, pro_only: req?.user?.plan === "pro" },
			});
			if (!guide)
				throw new Error(
					"Invalid credentials only pro members can access",
				);
			const tutorials = await Tutorials.findAll({
				where: { guide_id: guide?.id },
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
			const guide = await GuidesModel.update(req.body, {
				where: {
					id,
				},
			});
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
