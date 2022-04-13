'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class social_media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  social_media.init({
    user_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'social_media',
  });
  return social_media;
};