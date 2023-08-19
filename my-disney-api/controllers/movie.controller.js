const res = require("express/lib/response");
const db = require("../../models");
const Movie = db.movi;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty!"
        });
        return;
    }


    const movie = {
        title: req.body.title,
        releaseDate: req.body.releaseDate,
        rating: req.body.rating,
        image: req.body.image
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
    const movieTitle = req.query.movieTitle;
    var condition = movieTitle ? {
        title: {
            [Op.like]: `%${movieTitle}%`
        }
    } : null;

    Movie.findAll({
            where: condition,
            attributes: ['title', 'releaseDate', 'rating', 'image']
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