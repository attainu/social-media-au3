const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Postdata = sequelize.define(
    "post",
    {
      author: {
        type: DataTypes.STRING
        // validate: {
        //     notEmpty: true
        // }
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
      // timestamps: false
    },
    {
      hooks: {
        beforeCreate: partner => {
          const checkArrayData = field => {
            if (Array.isArray(field) === false) {
              field = field.split(",");
              console.log(field);
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
