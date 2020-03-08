const Sequelize = require('sequelize')
const UserModel = require('./models/usermodel')
const PostModel = require('./models/postmodel')

const sequelize = new Sequelize(process.env.db_uri,{logging:false});

sequelize
.authenticate()
.then(() => {
    console.log("Connection has been established successfully");
})
.catch(err => {
    console.error("Unable to connect to the database", err);
});

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

User.sequelize
.sync({ alter: true })
.then(result => {
    console.log("User table created");
})
.catch(err => {
    console.log("Failed to create table", err);
})
Post.sequelize
    .sync({ alter: true })
    .then(result => {
        console.log("Post table created");
    })
    .catch(err => {
        console.log("Failed to create table", err);
    })

module.exports = {
    User, Post
}