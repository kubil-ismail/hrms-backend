const model = require("../../models");
const setRedis = require("../../utils/setRedis");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await model.users.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new Error("User Id Not found");
      }
      const profile = await model.profile.findOne({
        where: { user_id: userId },
      });

      const result = {
        user:user,
        detail:profile,
      };

      setRedis(req.originalUrl, JSON.stringify(result));

      res.json({
        status: "OK",
        messages: "Success",
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
  addProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const requestBody = req.body;

      const find = await model.users.findOne({
        where: { id: userId },
      });
      if (!find) {
        throw new Error("User Id Not found");
      }

      const findProfile = await model.profile.findOne({
        where: { user_id: userId },
      });
      if (findProfile) {
        throw new Error("User profile a ready difined ");
      }

      const create = await model.profile.create({
        user_id: userId,
        ...requestBody,
      });

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
  editProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const requestBody = req.body;

      const findProfile = await model.profile.findOne({
        where: { user_id: userId },
      });
      if (!findProfile) {
        throw new Error("User profile not found ");
      }

      const update = await model.profile.update(requestBody, {
        where: { user_id: userId },
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
  deleteProfile: async (req, res) => {
    try {
      const { userid } = req.params;
      await model.skills.destroy({
        where: {
          user_id: userid,
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
