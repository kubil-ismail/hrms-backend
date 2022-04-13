const model = require("../../models");
const setRedis = require("../../utils/setRedis");

module.exports = {
  getJobs: async (req, res) => {
    try {
      const { limit, offset } = req.query;

      model.job.belongsTo(model.company, {
        foreignKey: {
          name: "company_id",
          allowNull: false,
        },
      });

      const result = await model.job.findAndCountAll({
        limit: parseInt(limit) || null,
        offset: parseInt(offset) || null,
        order: [["id", "DESC"]],
        distinct: true,
        include: [
          {
            model: model.company,
            required: true,
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
  getCompanyJobs: async (req, res) => {
    try {
      const { id } = req.params;
      const { limit, offset } = req.query;

      model.job.belongsTo(model.company, {
        foreignKey: {
          name: "company_id",
          allowNull: false,
        },
      });

      const result = await model.job.findAndCountAll({
        limit: parseInt(limit) || null,
        offset: parseInt(offset) || null,
        order: [["id", "DESC"]],
        distinct: true,
        where: { company_id: id },
        include: [
          {
            model: model.company,
            required: true,
            attributes: ["name", "photo", ""],
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
  findJobs: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await model.job.findOne({
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
