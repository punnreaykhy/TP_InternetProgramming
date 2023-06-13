const Jwt = require('jsonwebtoken')

const createASessionToken = (userId, email) => {
  return Jwt.sign({
    _id: userId,
    email,
  }, 'jwt-secret');
}

module.exports = {
  createASessionToken
}