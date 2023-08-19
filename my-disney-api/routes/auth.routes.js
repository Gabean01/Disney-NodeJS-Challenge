const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * @swagger
     * /api/v1/auth/register:
     *   post:
     *     tags:
     *       - Auth
     *     description: Create user
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.post(
        "/api/v1/auth/register", [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.register
    );

    /**
     * @swagger
     * /api/v1/auth/login:
     *   post:
     *     tags:
     *       - Auth
     *     description: Login user
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.post("/api/v1/auth/login", controller.login);
};