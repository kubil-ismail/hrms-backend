const model = require("../../models");
const setRedis = require("../../utils/setRedis");

module.exports = {
  getSosmed: async (req, res) => {
    try {
      const { userId } = req.params;
      const { limit, offset } = req.query;

      const result = await model.social_media.findAndCountAll({
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
  addSosmed: async (req, res) => {
    try {
      const requestBody = req.body;
      const create = await model.social_media.create(requestBody);

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
  editSosmed: async (req, res) => {
    try {
      const { id } = req.params;
      const requestBody = req.body;

      const update = await model.social_media.update(requestBody, {
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
  deleteSosmed: async (req, res) => {
    try {
      const { id } = req.params;
      await model.social_media.destroy({
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