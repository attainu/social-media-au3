require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const { User } = require('./database');

app.use(bodyParser.json());

app.post('/signup', async(req, res) => {
    let checkEmail = await User.findAll({
        where: {Email: {[Sequelize.Op.eq]: req.body.Email}}
    });

    if(checkEmail.length === 0) {
        try {
            const hashPassword = await bcrypt.hash(req.body.Password, 10);
            let user = {...req.body, Password: hashPassword};
            let newUser = await User.create(user);
            const token = jwt.sign(newUser.dataValues, process.env.SECRET_OR_KEY);
            res.json({token: token});
        }
        catch {
            return res.status(422).send();
        }
    }
    else {
        return res.status(409).send();
    }
       
})

app.post('/signin', async(req, res) => {
    let user = await User.findAll({
        where: {Email: {[Sequelize.Op.eq]: req.body.Email}}
    });

    if(user.length === 0) {
        return res.status(400).send();
    }

    try {
        if(await bcrypt.compare(req.body.Password, user[0].dataValues.Password)) {
            const payload = user[0].dataValues;
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
            res.json({token: token});
        }
    }
    catch {
        res.status(500).send();
    }
})

app.listen(5000);