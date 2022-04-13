'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  company.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    photo: DataTypes.STRING,
    background: DataTypes.STRING,
    location: DataTypes.STRING,
    industry: DataTypes.STRING,
    website: DataTypes.STRING,
    company_size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'company',
  });
  return company;
};