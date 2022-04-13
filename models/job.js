"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  job.init(
    {
      name: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      category: DataTypes.STRING,
      desc: DataTypes.STRING,
      requirement: DataTypes.STRING,
      category: DataTypes.STRING,
      salary_min: DataTypes.INTEGER,
      salary_max: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "job",
    }
  );
  return job;
};
