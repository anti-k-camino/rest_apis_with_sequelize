module.exports = app => {
  const scripts = require("../controllers/script.controller.js");
  const router = require("express").Router();
  // Create a new Script
  router.post("/", scripts.create);
  // Retrieve all Scripts
  router.get("/", scripts.findAll);
  // Retrieve all published Scripts
  router.get("/published", scripts.findAllPublished);
  // Retrieve a single Script with id
  router.get("/:id", scripts.findOne);
  // Update a Script with id
  router.put("/:id", scripts.update);
  // Delete a Script with id
  router.delete("/:id", scripts.delete);
  // Create a new Script
  router.delete("/", scripts.deleteAll);
  app.use('/api/scripts', router);
};
