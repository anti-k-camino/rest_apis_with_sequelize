module.exports = (sequelize, Sequelize) => {
  return sequelize.define('script', {
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    published: { type: Sequelize.BOOLEAN }
  });
};
