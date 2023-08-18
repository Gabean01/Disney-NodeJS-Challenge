module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: DataTypes.STRING,
    });

    /*Genre.associate = (models) => {
        Genre.belongsToMany(models.Movie, {
            through: 'Movie',
            foreignKey: 'genreId',
        });
    };*/

    return Genre;
};