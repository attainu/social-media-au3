const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const router = express.Router()

const { User } = require('../database')

router.use(bodyParser.json());

router.get('/username/:name', async(req, res) => {
    let SearchedUser = await User.findAll({
        where: {Name: {[Sequelize.Op.iLike]: `%${req.params.name}%`}}
    });

    if(SearchedUser.length === 0) {
        res.status(404).send();
    }
    else {
        res.json(SearchedUser);
    }
})

module.exports = router;