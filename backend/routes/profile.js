const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const multipart = require("connect-multiparty")
const cloudinary = require('cloudinary').v2
const auth = require('../middleware/auth')

const { User } = require('../database')

const router = express.Router()
const multipartMiddleware = multipart()

router.use(bodyParser.json());

router.get('/userinfo/:email', auth, async(req, res) => {
    let userData = await User.findAll({
        where: {Email: {[Sequelize.Op.eq]: req.params.email}}
    });

    res.json(userData[0].dataValues);
})

router.put('/update/picture/:email', auth, multipartMiddleware, async(req, res) => {
    cloudinary.uploader.upload(
        req.files.proPic.path,
        {
            folder: "socialme/profile_picture/",
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        },
        async function(error, result) {
            if(error) {
                return res.status(500).send(error);
            }
            await User.update(
                {Picture: result.secure_url},
                {where: {Email: {[Sequelize.Op.eq]: req.params.email}}}
            );
            res.status(200).send();
        }
    )
})


router.put('/update/info/:email', auth, async(req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.Password, 10);
        await User.update(
            {...req.body, Password: hashPassword},
            {where: {Email: {[Sequelize.Op.eq]: req.params.email}}}
        );
        res.status(200).send();
    }
    catch {
        return res.status(422).send();
    }
})

module.exports = router;