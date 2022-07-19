
const DbhelpersController = require("./controller");
const BaseRouter = require("flow-express/general/BaseRouter.js");

const controller = new DbhelpersController();
const router = new BaseRouter("/db-helpers", ":id", controller);

module.exports = router;
