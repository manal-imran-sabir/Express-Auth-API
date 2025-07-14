const { User } = require('../models');

async function getAllUsers() {
  return await User.findAll({
    attributes: { exclude: ['password'] },
    order: [['createdAt', 'DESC']]
  });
}

async function getUserById(id) {
  return await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  });
}

async function updateUser(id, updateData) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }

  // Prevent changing role unless admin
  if (updateData.role && updateData.userRole !== 'admin') {
    throw new Error('Unauthorized to change role');
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, authConfig.bcrypt.saltRounds);
  }

  await user.update(updateData);
  return sanitizeUser(user);
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }

  await user.destroy();
  return true;
}

function sanitizeUser(user) {
  const values = user.get();
  delete values.password;
  return values;
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
