require('dotenv').config();

module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || 'verysecretkey',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },
  bcrypt: {
    saltRounds: 10
  },
  roles: {
    admin: 'admin',
    user: 'user'
  }
};
