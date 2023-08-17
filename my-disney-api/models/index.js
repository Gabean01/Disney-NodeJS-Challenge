const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USERNAME,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.DIALECT,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.character = require("../models/character.model.js")(sequelize, Sequelize);
db.movie = require("../models/movie.model.js")(sequelize, Sequelize);
db.genre = require("../models/genre.model.js")(sequelize, Sequelize);

/*db.movie.belongsToMany(db.character, {
    through: 'Movie',
    foreignKey: 'characterId',
    otherKey: 'movieId'
});

db.character.belongsToMany(db.movie, {
    through: 'Movie',
    foreignKey: 'movieId',
    otherKey: 'characterId'
});*/

db.ROLES = ["user", "admin"];

module.exports = db;