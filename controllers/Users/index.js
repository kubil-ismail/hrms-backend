const model = require("../../models");
const setRedis = require("../../utils/setRedis");
const helpers = require("../../helpers/index");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const fs = require("fs");
const nodemailer = require("../../utils/nodemailer");

module.exports = {
  getUser: (req, res) => {
    const payload = helpers.parseJwt(
      req.headers.authorization.substring(7, req.headers.authorization?.length)
    );

    model.users
      .findOne({ where: { email: payload.email } })
      .then((result) => {
        if (!result) throw new Error("User is not found");

        // Set data to redis for 10 seconds
        setRedis(req.originalUrl, JSON.stringify(result));
        res.json({
          status: "OK",
          messages: "",
          data: result,
        });
      })
      .catch((error) =>
        res.json({
          status: "ERROR",
          messages: error.message,
          data: null,
        })
      );
  },
  editUser: async (req, res) => {
    try {
      const requestBody = req.body;
      const payload = helpers.parseJwt(
        req.headers.authorization.substring(
          7,
          req.headers.authorization?.length
        )
      );

      // edit email
      if (requestBody.email) {
        const users = await model.users.findOne({
          where: { email: requestBody.email },
        });

        if (users) {
          throw new Error("Email already exist");
        } else {
          update = { status: 0 };

          const template = fs.readFileSync(
            "./helpers/editAccountTemplates.html",
            {
              encoding: "utf-8",
            }
          );

          const token = jwt.sign(requestBody, process.env.APP_SECRET_KEY, {
            expiresIn: "1h",
          });

          const verify_url = `${process.env.APP_URL}/v1/activate?token=${token}`;
          await nodemailer({
            template,
            email: requestBody.email,
            link: verify_url,
            subject: "Update email",
          });
        }
      }

      // edit password
      if (requestBody.password) {
        const hashPassword = bcrypt.hashSync(requestBody.password, bcryptSalt);
        update = await model.users.update(
          { ...requestBody, ...{ password: hashPassword } },
          { where: { email: payload.email } }
        );
      } else {
        update = await model.users.update(requestBody, {
          where: { email: payload.email },
        });
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
};
