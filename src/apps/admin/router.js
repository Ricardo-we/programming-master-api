const AdminController = require("./controllers/admin.controller");
const AdminUserController = require("./controllers/admin-users.controller");
const {
	adminAuthMiddleware,
} = require("../../utils/middleware/auth.middleware");

const BaseRouter = require("flow-express/general/BaseRouter.js");

const controller = new AdminController();
const adminUsersController = new AdminUserController();
const router = new BaseRouter("/admin", ":model_name", controller, {
	post: adminAuthMiddleware,
	put: adminAuthMiddleware,
	delete: adminAuthMiddleware,
	getOne: adminAuthMiddleware,
});

router.registerRoute(adminUsersController, "/admin-users", { params: ":id" });
router.router.post("/admin-users/login", adminUsersController.authenticate);
module.exports = router;
