const { authJwt } = require("../middleware");
const movie = require("../controllers/movie.controller");

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
     * /api/v1/movies:
     *   get:
     *     tags:
     *       - Movies
     *     description: Returns all movies
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.get("/api/v1/movies", [authJwt.verifyToken], movie.findAll);

    /**
     * @swagger
     * /api/v1/movie:
     *   post:
     *     tags:
     *       - Movies
     *     description: Create movie
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.post("/api/v1/movie", [authJwt.verifyToken], movie.create);

    /**
     * @swagger
     * /api/v1/movie/:id :
     *   get:
     *     tags:
     *       - Movies
     *     description: Get specific movie
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.get("/api/v1/movie/:id", [authJwt.verifyToken], movie.findOne);

    /**
     * @swagger
     * /api/v1/movie/:id :
     *   update:
     *     tags:
     *       - Movies
     *     description: Update specific movie
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.put("/api/v1/movie/:id", [authJwt.verifyToken], movie.update);

    /**
     * @swagger
     * /api/v1/movie/:id :
     *   delete:
     *     tags:
     *       - Movies
     *     description: Delete specific movie
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.delete("/api/v1/movie/:id", [authJwt.verifyToken], movie.delete);

    /**
     * @swagger
     * /api/v1/movies:
     *   delete:
     *     tags:
     *       - Movies
     *     description: Delete all movies
     *     responses:
     *       200:
     *         description: Success
     * 
     */
    app.delete("/api/v1/movies", [authJwt.verifyToken], movie.deleteAll);
};