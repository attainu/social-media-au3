const jwt = require('jsonwebtoken')
const { User } = require('../database')
const Sequelize = require('sequelize')

const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.SECRET_OR_KEY);

        try {
            const user = await User.findAll({
                where: {Email: {[Sequelize.Op.eq]: data.Email}}
            });
            if (user.length === 0) {
                throw new Error("User not found");
            }
            next();
        } catch {
            res.status(401).send();
        }
    } catch {
        res.status(400).send();
    }
}

module.exports = auth;