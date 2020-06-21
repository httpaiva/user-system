const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.JWT_SECRET;

module.exports = {
    sign: payload => jwt.sign(payload, secret, { expiresIn: 86400}),
    verify: token => jwt.verify(token, secret)
}