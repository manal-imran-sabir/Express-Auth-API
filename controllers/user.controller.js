const userService = require('../services/user.service');
const apiResponse = require('../utils/apiResponse');

async function getUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    apiResponse.success(res, { users }, 'Users fetched successfully');
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);
    apiResponse.success(res, { user }, 'User fetched successfully');
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await userService.updateUser(
      req.params.id, 
      req.body,
      req.user.role
    );
    apiResponse.success(res, { user }, 'User updated successfully');
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    await userService.deleteUser(req.params.id);
    apiResponse.success(res, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
