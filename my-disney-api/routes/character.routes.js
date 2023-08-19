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

    app.get("/api/v1/characters", [authJwt.verifyToken], character.findAll);

    app.post("/api/v1/character", [authJwt.verifyToken], character.create);

    app.get("/api/v1/character/:id", [authJwt.verifyToken], character.findOne);

    app.put("/api/v1/character/:id", [authJwt.verifyToken], character.update);

    app.delete("/api/v1/character/:id", [authJwt.verifyToken], character.delete);

    app.delete("/api/v1/characters", [authJwt.verifyToken], character.deleteAll);

};