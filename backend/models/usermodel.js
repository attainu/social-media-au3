module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: type.STRING,
            validate: {
                notEmpty: true
            }
        },
        Email: {
            type: type.STRING,
            validate: {
                notEmpty: true
            }
        },
        Username: {
            type: type.STRING,
            validate: {
                notEmpty: true
            }
        },
        Password: {
            type: type.STRING,
            validate: {
                notEmpty: true
            }
        },
        DOB: {
            type: type.STRING,
            validate: {
                notEmpty: true
            }
        },
        Country: {
            type: type.STRING,
            validate: {
                notEmpty: true
            }
        },
        State: {
            type: type.STRING,
            validate: {
                notEmpty: true
            }
        },
        Gender: {
            type: type.STRING,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}