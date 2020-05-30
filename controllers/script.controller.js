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
exports.findAll = (req, res) => {
  // const { title } = req.query;
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Script.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => { res.status(500).send({
        message: err.message || 'Error occured while retrieving.'
      });
    });
};

// Find a single by id
exports.findOne = (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  Script.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => { res.status(500).send({
        message: "Error retrieving with id=" + id
      });
    });
};

// Update by id
exports.update = (req, res) => {
  const { id } = req.params;
  if (!req.body)
    return res.status(400).send({ message: 'Content should be provided.'});
  Script.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1)
        return res.status(200).send({ message: 'Updated successfully.' });
      return res.status(500).send({ message: `Failed to update id:${id}.` });
    })
    .catch(err => { res.status(500).send({ message: `Error ${err.message}.` }); });
};

// Delete by id in request
exports.delete = (req, res) => {
  const { id } = req.params;
  Script.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1)
        return res.status(200).send({ message: 'Deleted successfully.' });
      return res.status(500).send({ message: `Failed to delete id:${id}.` });
    })
    .catch(err => { res.status(500).send({ message: `Error ${err.message}.` }); });
};

// Delete all
exports.deleteAll = (req, res) => {
  Script.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} scripts were deleted successfully!` });
    })
    .catch(err => { res.status(500).send({
        message: err.message || "Error occurred while removing all."
      });
    });
};

// Find all where published === true
exports.findAllPublished = (req, res) => {
  Script.findAll({ where: { published: true } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: `Error ${err.message}.` }));
};
