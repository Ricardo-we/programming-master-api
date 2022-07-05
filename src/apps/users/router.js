const UsersController = require("./controller");
const BaseRouter = require("flow-express/general/BaseRouter.js");

const controller = new UsersController();
const router = new BaseRouter("/users", ":id", controller);
router.router.post("/users/authenticate", controller.authenticate);

module.exports = router;
