const db = require('../models');
const Script = db.scripts;
// const Op = db.Sequelize.Op;
const { Op }  = db.Sequelize;

// Create and save new
exports.create = (req, res) => {
  if (!req.body.title) // Validate request.|| !req.body.description ?
    return res.status(400).send({ message: 'Title should be provided!' });
  const script = { // Creation
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  Script.create(script)
    .then(data => res.send(data))
    .catch(err => { res.status(500).send({
        message: err.message || 'Error occured while creating(saving to db).'
      });
    });
};

// Retrieve all
exports.findAll = (req, res) => {};

// Find a single by id
exports.findOne = (req, res) => {};

// Update by id
exports.update = (req, res) => {};

// Delete by id in request
exports.delete = (req, res) => {};

// Delete all
exports.deleteAll = (req, res) => {};

// Find all published
exports.findAllPublished = (req, res) => {};
