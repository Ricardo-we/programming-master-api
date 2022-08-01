
const ApptranslationsController = require("./controller");
const BaseRouter = require("flow-express/general/BaseRouter.js");

const controller = new ApptranslationsController();
const router = new BaseRouter("/app-translations", ":id", controller);

module.exports = router;
