const jwt = require('jsonwebtoken');

const generateToken = (id) => `Bearer ${jwt.sign(id, process.env.SECRET)}`;

module.exports = { generateToken };
