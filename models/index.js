const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: console.log
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.scripts = require("./script.model.js")(sequelize, Sequelize);

module.exports = db;
