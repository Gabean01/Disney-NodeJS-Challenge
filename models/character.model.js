module.exports = (sequelize, DataTypes) => {
    const Character = sequelize.define('Character', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: DataTypes.INTEGER,
        weight: DataTypes.FLOAT,
        history: DataTypes.TEXT,
        image: DataTypes.STRING,


    });
    Character.associate = (models) => {
        Character.belongsToMany(models.Movie, {
            through: 'Movie',
            foreignKey: 'characterId',
        });
    };


    return Character;
};