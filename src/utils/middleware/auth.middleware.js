const { errorResponse } = require("flow-express/general/base.response");
const { verifyUserToken, verifyUserIsAdmin } = require("../jwt");

async function authMiddleware(req, res, next) {
	try {
		req.user = await verifyUserToken(req, true);
		next();
	} catch (error) {
		errorResponse(error, res);
	}
}

async function adminAuthMiddleware(req, res, next) {
	try {
		req.user = await verifyUserIsAdmin(req);
		next();
	} catch (error) {
		errorResponse(error, res);
	}
}

module.exports = { authMiddleware, adminAuthMiddleware };
