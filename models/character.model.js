module.exports = (sequelize, DataTypes) => {
    const Character = sequelize.define('Characters', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: DataTypes.INTEGER,
        weight: DataTypes.FLOAT,
        history: DataTypes.TEXT,
        image: DataTypes.STRING,
    });

    return Character;
};