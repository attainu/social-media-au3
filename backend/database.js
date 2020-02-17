const Sequelize = require('sequelize')
const UserModel = require('./models/usermodel')

const sequelize = new Sequelize('projectrial', 'postgres', 'sreerup', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize
.authenticate()
.then(() => {
    console.log("Connection has been established successfully");
})
.catch(err => {
    console.error("Unable to connect to the database", err);
});

const User = UserModel(sequelize, Sequelize);

User.sequelize
.sync({ alter: true })
.then(result => {
    console.log("User table created");
})
.catch(err => {
    console.log("Failed to create table", err);
})

module.exports = {
    User
}