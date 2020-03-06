const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Postdata = sequelize.define(
    "post",
    {
      author: {
        type: DataTypes.STRING
      },
      posts: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true
        }
      },
      images: {
        type: DataTypes.STRING
      },
      like: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      comment: {
        type: Sequelize.ARRAY(Sequelize.JSONB)
      }
    },
    {
      freezeTableName: true
    },
    {
      hooks: {
        beforeCreate: partner => {
          const checkArrayData = field => {
            if (Array.isArray(field) === false) {
              field = field.split(",");
            }
            return field;
          };
          partner.like = checkArrayData(partner.like);
        }
      }
    }
  );

  return Postdata;
};
