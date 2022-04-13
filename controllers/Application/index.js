const model = require("../../models");
const setRedis = require("../../utils/setRedis");

module.exports = {
  getApplication: async (req, res) => {
    try {
      const { limit, offset } = req.query;

      model.company.belongsTo(model.job, {
        foreignKey: {
          name: "id",
          allowNull: false,
        },
      });

      const result = await model.company.findAndCountAll({
        limit: parseInt(limit) || null,
        offset: parseInt(offset) || null,
        order: [["id", "DESC"]],
        include: [
          {
            model: model.job,
          },
        ],
      });

      setRedis(req.originalUrl, JSON.stringify(result));

      res.json({
        status: "OK",
        messages: result.length === 0 ? "No data records" : "",
        data: {
          ...result,
          ...{ page: parseInt(offset), limit: parseInt(limit) },
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        messages: error.message,
        data: {},
      });
    }
  },
  addApplication: async (req, res) => {
    try {
      const requestBody = req.body;
      const create = await model.company.create(requestBody);

      if (!create) {
        throw new Error("Failed insert data");
      }

      res.status(201).json({
        status: "OK",
        messages: "insert success",
        data: null,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        messages: error.message,
        data: null,
      });
    }
  },
  editApplication: async (req, res) => {
    try {
      const { id } = req.params;
      const requestBody = req.body;

      const update = await model.company.update(requestBody, {
        where: { id },
      });

      if (!update) {
        throw new Error("Failed update data");
      }

      res.json({
        status: "OK",
        messages: "update success",
        data: null,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        messages: error.message,
        data: null,
      });
    }
  },
  deleteApplication: async (req, res) => {
    try {
      const { id } = req.params;
      await model.company.destroy({
        where: {
          id,
        },
      });

      res.json({
        status: "OK",
        messages: "delete success",
        data: null,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        messages: error.message,
        data: null,
      });
    }
  },
  findApplication: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await model.company.findOne({
        where: { id },
      });

      setRedis(req.originalUrl, JSON.stringify(result));

      res.json({
        status: "OK",
        messages: "",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        messages: error.message,
        data: {},
      });
    }
  },
};
