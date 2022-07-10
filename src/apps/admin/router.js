const AdminController = require("./controllers/admin.controller");
const {
	adminAuthMiddleware,
} = require("../../utils/middleware/auth.middleware");

const BaseRouter = require("flow-express/general/BaseRouter.js");

const controller = new AdminController();
const router = new BaseRouter("/admin", ":model_name", controller, {
	get: adminAuthMiddleware,
	post: adminAuthMiddleware,
	put: adminAuthMiddleware,
	delete: adminAuthMiddleware,
});

module.exports = router;
