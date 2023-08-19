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


    app.get("/api/v1/movies", [authJwt.verifyToken], movieController.findAll);

    app.post("/api/v1/movies", [authJwt.verifyToken], movieController.create);

    app.get("/api/v1/movies/:id", [authJwt.verifyToken], movieController.findOne);

    app.put("/api/v1/movies/:id", [authJwt.verifyToken], movieController.update);

    app.delete("/api/v1/movies/:id", [authJwt.verifyToken], movieController.delete);

    app.delete("/api/v1/movies", [authJwt.verifyToken], movieController.deleteAll);
};