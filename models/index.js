const { sequelize } = require('../config/db.config');
const User = require('./user.model');

User(sequelize);

module.exports = {
  sequelize,
  user: sequelize.models.User
};
