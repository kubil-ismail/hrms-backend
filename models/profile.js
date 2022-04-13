'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profile.init({
    user_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    location: DataTypes.STRING,
    residential_status: DataTypes.STRING,
    about_me: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    nasionality: DataTypes.STRING,
    cv: DataTypes.STRING,
    profession: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};