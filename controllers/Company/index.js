const model = require("../../models");
const setRedis = require("../../utils/setRedis");

module.exports = {
  getCompany: async (req, res) => {
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
  addCompany: async (req, res) => {
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
  editCompany: async (req, res) => {
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
  deleteCompany: async (req, res) => {
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
  findCompany: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await model.company.findOne({
        where: { id },
      });

      const companyJobs = await model.job.findAll({
        where: { company_id: id },
      });

      setRedis(req.originalUrl, JSON.stringify({ result, jobs: companyJobs }));

      res.json({
        status: "OK",
        messages: "",
        data: { result, jobs: companyJobs },
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
