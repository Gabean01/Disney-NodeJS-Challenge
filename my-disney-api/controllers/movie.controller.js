const res = require("express/lib/response");
const db = require("../../models");
const Movie = db.movie;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title || !req.body.characterId) {
        res.status(400).send({
            message: "Title or characterId can not be empty!"
        });
        return;
    }
    const movie = {
        title: req.body.title,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        image: req.body.image,
        characterId: req.body.characterId
    };

    Movie.create(movie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Movie."
            });
        });
};

exports.findAll = (req, res) => {
    let condition = {};
    if (req.query.name) {
        condition.title = {
            [Op.like]: `%${req.query.name}%`
        };
    }

    if (req.query.genre) {
        condition.genre = {
            [Op.like]: `%${req.query.genre}%`
        };
    }

    const order = req.query.order && (req.query.order.toUpperCase() === 'ASC' || req.query.order.toUpperCase() === 'DESC') ? req.query.order.toUpperCase() : 'ASC';

    Movie.findAll({
            where: condition,
            attributes: ['title', 'releaseDate', 'image'],
            order: [
                ['title', order]
            ]
        })
        .then(data => {
            res.send({
                success: true,
                code: 200,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving movies."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Movie.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Movie with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Movie.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Movie was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Movie with id=${id}. Maybe Movie was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Movie with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Movie.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Movie was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Movie with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Movie.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Movies were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all movies."
            });
        });
};

exports.findMoviesByCharacterId = (characterId) => {
    return new Promise((resolve, reject) => {
        Movie.findAll({
                where: { characterId: characterId }
            })
            .then(data => {
                if (data.length === 0) {
                    reject([]);
                } else {
                    resolve(data);
                }
            })
            .catch(err => {
                reject(new Error("Error retrieving movies for character with id=" + characterId + ". Error: " + err.message));
            });
    });
};