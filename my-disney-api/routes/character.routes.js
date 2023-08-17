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

    app.get("/characters/", [authJwt.verifyToken], character.findAll);

    app.post("/character/", [authJwt.verifyToken], character.create);

    app.get("/character/:id", [authJwt.verifyToken], character.findOne);

    app.put("/character/:id", [authJwt.verifyToken], character.update);

    app.delete("/character/:id", [authJwt.verifyToken], character.delete);

    app.delete("/characters/", [authJwt.verifyToken], character.deleteAll);

};