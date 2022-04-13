const model = require("../../models");
const setRedis = require("../../utils/setRedis");

module.exports = {
  getSkills: async (req, res) => {
    try {
      const { userId } = req.params;
      const { limit, offset } = req.query;

      const result = await model.skills.findAndCountAll({
        where: {user_id: userId},
        limit: parseInt(limit) || null,
        offset: parseInt(offset) || null,
        order: [["id", "DESC"]],
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
  addSkill: async (req, res) => {
    try {
      const requestBody = req.body;
      const create = await model.skills.create(requestBody);

      if (!create) {
        throw new Error("Failed insert data");
      }

      res.status(201).json({
        status: "OK",
        messages: "insert success",
        data: requestBody,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        messages: error.message,
        data: null,
      });
    }
  },
  editSkill: async (req, res) => {
    try {
      const { id } = req.params;
      const requestBody = req.body;

      const update = await model.skills.update(requestBody, {
        where: { id },
      });

      if (!update) {
        throw new Error("Failed update data");
      }

      res.json({
        status: "OK",
        messages: "update success",
        data: requestBody,
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        messages: error.message,
        data: null,
      });
    }
  },
  deleteSkill: async (req, res) => {
    try {
      const { id } = req.params;
      await model.skills.destroy({
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
};
