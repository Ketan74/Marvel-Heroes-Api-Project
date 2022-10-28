const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(userName) {
    const payload = {
        user: userName,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr",
    });
}

module.exports = jwtGenerator;
