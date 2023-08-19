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


    app.get("/api/v1/movies", [authJwt.verifyToken], movie.findAll);

    app.post("/api/v1/movie", [authJwt.verifyToken], movie.create);

    app.get("/api/v1/movie/:id", [authJwt.verifyToken], movie.findOne);

    app.put("/api/v1/movie/:id", [authJwt.verifyToken], movie.update);

    app.delete("/api/v1/movie/:id", [authJwt.verifyToken], movie.delete);

    app.delete("/api/v1/movies", [authJwt.verifyToken], movie.deleteAll);
};