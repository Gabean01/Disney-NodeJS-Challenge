const db = require("../models");
const Character = db.character;

module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movies', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        releaseDate: DataTypes.DATE,
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        image: DataTypes.STRING,
        characterId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Characters',
                key: 'id'
            }
        }
    });
    /*Movie.associate = models => {
        Character.belongsTo(models.Character, { foreignKey: 'characterId' });
    };*/

    return Movie;
};