"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  application.init(
    {
      user_id: DataTypes.INTEGER,
      job_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      remark: DataTypes.STRING,
      cv: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "application",
    }
  );
  return application;
};
