const { authJwt } = require("../middleware");
const character = require("../controllers/character.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * @swagger
     * /api/v1/characters:
     *   get:
     *     tags:
     *       - Characters
     *     description: Returns all characters
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.get("/api/v1/characters", [authJwt.verifyToken], character.findAll);

    /**
     * @swagger
     * /api/v1/character:
     *   post:
     *     tags:
     *       - Characters
     *     description: Create character
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.post("/api/v1/character", [authJwt.verifyToken], character.create);

    /**
     * @swagger
     * /api/v1/character/:id :
     *   get:
     *     tags:
     *       - Characters
     *     description: Get specific character
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.get("/api/v1/character/:id", [authJwt.verifyToken], character.findOne);

    /**
     * @swagger
     * /api/v1/character/:id :
     *   update:
     *     tags:
     *       - Characters
     *     description: Update specific character
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.put("/api/v1/character/:id", [authJwt.verifyToken], character.update);

    /**
     * @swagger
     * /api/v1/character/:id :
     *   delete:
     *     tags:
     *       - Characters
     *     description: Delete specific movcharacterie
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.delete("/api/v1/character/:id", [authJwt.verifyToken], character.delete);

    /**
     * @swagger
     * /api/v1/character:
     *   delete:
     *     tags:
     *       - Characters
     *     description: Delete all character
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.delete("/api/v1/characters", [authJwt.verifyToken], character.deleteAll);

};