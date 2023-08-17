module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
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
    });

    Movie.associate = (models) => {
        Movie.belongsToMany(models.Character, {
            through: 'Movie',
            foreignKey: 'movieId',
        });

        Movie.belongsToMany(models.Genre, {
            through: 'Genre',
            foreignKey: 'movieId',
        });
    };

    return Movie;
};