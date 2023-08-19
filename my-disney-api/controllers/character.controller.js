const req = require("express/lib/request");
const db = require("../../models");
const res = require("express/lib/response");
const { findMoviesByCharacterId } = require("./movie.controller");
const Character = db.character;
const movie = require("../controllers/movie.controller");
const Op = db.Sequelize.Op;

//Create and Save a new Character
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }
    const character = {
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        history: req.body.history,
        image: req.body.image
    };

    Character.create(character)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Character."
            });
        });
};

exports.findAll = (req, res) => {
    const character_name = req.query.character_name;
    var condition = character_name ? {
        name: {
            [Op.like]: `%${character_name}%`
        }
    } : null;

    Character.findAll({
            where: condition,
            attributes: ['name', 'image']
        })
        .then(data => {
            res.send({
                "success": true,
                "code": 200,
                "data": data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving characters."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Character.findByPk(id)
        .then(data => {
            // Now find the movies for this character
            findMoviesByCharacterId(id).then(movies => {
                // Include movies in the response
                res.send({
                    character: data,
                    movies: movies
                });
            }).catch(movieErr => {
                res.status(500).send({
                    message: "Error retrieving movies for character with id=" + id
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Character with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Character.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Character was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Character with id=${id}. Maybe Character was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Character with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Character.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Character was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Character with id=${id}. Maybe Character was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Character with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Character.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Characters were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all characters."
            });
        });
};

exports.findAllPublished = (req, res) => {
    Character.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving characters."
            });
        });
};