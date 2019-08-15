const db = require("../models");

// Defining methods for the userController
module.exports = {

    findById: function (req, res) {
        db.RabUrl
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.RabUrl
            .create(req.body)
            .then(console.log(dbModel))
            .then(db.Users.update(
                { _id: req.params.userId },
                { $push: { rabUrl: dbModel._id } }
              ))
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.RabUrl
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.RabUrl
            .findById({
                _id: req.params.id
            })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByKeyWord: function (req,res) {
        db.RabUrl
            .find({
                keyWords: req.params.word
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findSingleUserKeyWord: function (req,res) {
        db.RabUrl
            .find({
                userId: req.params.userId,
                keyWords: req.params.word
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
