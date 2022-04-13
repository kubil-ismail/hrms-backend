require("dotenv").config();
const model = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const fs = require("fs");
const nodemailer = require("../../utils/nodemailer");

module.exports = {
  // post auth/login
  login: (req, res) => {
    const { email, password } = req.body;

    model.users
      .findOne({
        where: { email: email },
      })
      .then((result) => {
        if (!result) throw new Error("User not exist");

        if (result && result.dataValues.is_login) {
          throw new Error("User already login");
        }

        // check if user has activate
        // if (result && result.dataValues.status !== 2) {
        //   throw new Error("User must activate first");
        // }

        return result;
      })
      .then((result) => {
        const compare = bcrypt.compareSync(
          password,
          result.dataValues.password
        );
        if (!compare) throw new Error("Wrong password");

        model.users
          .update({ is_login: 1 }, { where: { email } })
          .then((status) => {
            if (!status[0]) throw new Error("Something wrong");

            const token = jwt.sign(
              { email: email, password: result.dataValues.password },
              process.env.APP_SECRET_KEY,
              {
                expiresIn: "24h",
              }
            );

            res.json({
              status: "OK",
              messages: "",
              data: {
                token: token,
                result,
              },
            });
          });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message,
          data: null,
        })
      );
  },
  // post auth/register
  register: (req, res) => {
    const requestBody = req.body;

    model.users
      .findOne({
        where: { email: requestBody.email },
      })
      .then(async (result) => {
        if (result) throw new Error("User already registered");

        // const template = fs.readFileSync("./helpers/activateTemplates.html", {
        //   encoding: "utf-8",
        // });

        // const token = jwt.sign(requestBody, process.env.APP_SECRET_KEY, {
        //   expiresIn: "1h",
        // });

        // const verify_url = `${process.env.APP_URL}/v1/activate?token=${token}`;
        // const send = await nodemailer({
        //   template,
        //   email: requestBody.email,
        //   link: verify_url,
        //   subject: "Activate account",
        // });

        // if (!send) throw new Error("Send activation failed");

        const hashPassword = bcrypt.hashSync(requestBody.password, bcryptSalt);

        return model.users.create({
          ...requestBody,
          ...{
            password: hashPassword,
          },
        });
      })
      .then((result) => {
        if (!result) throw new Error("Failed insert data");

        res.status(201).json({
          status: "OK",
          messages: "insert success",
          data: null,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message || "Something wrong",
          data: null,
        })
      );
  },
  // post auth/logout
  logout: (req, res) => {
    const { id } = req.params;

    model.users
      .update({ is_login: 0 }, { where: { id } })
      .then((result) => {
        if (!result[0]) throw new Error("Failed logout");

        res.json({
          status: "OK",
          messages: "Logout success",
          data: null,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message,
          data: null,
        })
      );
  },
  // patch auth/activate
  activate: (req, res) => {
    const { token } = req.query;

    const redirect_url = process.env.APP_REDIRECT;
    const decode = jwt.verify(token, process.env.APP_SECRET_KEY);

    jwt.verify(token, process.env.APP_SECRET_KEY, async (err) => {
      if (err) {
        res.redirect(redirect_url + "/activate/failed");
      } else {
        const users = await model.users.findOne({
          where: { email: decode.email },
        });

        if (!users) {
          res.redirect(redirect_url + "/activate/failed");
        }

        await model.users.update(
          { status: 2 },
          { where: { email: decode.email } }
        );

        res.redirect(redirect_url + "/activate/success");
      }
    });
  },
  // post auth/forgot
  forgot: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await model.users.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new Error("User not exist");
      }

      const template = fs.readFileSync("./helpers/forgotTemplates.html", {
        encoding: "utf-8",
      });

      const token = jwt.sign(req.body, process.env.APP_SECRET_KEY, {
        expiresIn: "1h",
      });

      const verify_url = `${process.env.APP_URL}/v1/forgot/verify?token=${token}`;

      await nodemailer({
        template,
        email: email,
        link: verify_url,
        name: user.dataValues.fullname,
        subject: "Reset your password",
      });

      res.status(200).json({
        status: "OK",
        messages: "send success",
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
  forgotVerify: async (req, res) => {
    try {
      const { token } = req.query;

      const redirect_url = process.env.APP_REDIRECT;
      const decode = jwt.verify(token, process.env.APP_SECRET_KEY);

      jwt.verify(token, process.env.APP_SECRET_KEY, async function (err) {
        if (err) {
          res.redirect(redirect_url + "/activate/failed");
        } else {
          const users = await model.users.findOne({
            where: { email: decode.email },
          });

          if (!users) {
            res.redirect(redirect_url + "/activate/failed");
          } else {
            res.redirect(redirect_url + `/reset-password/${token}`);
          }
        }
      });
    } catch (error) {
      res.status(400).json({
        status: "ERROR",
        messages: error.message,
        data: null,
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;

      const decode = jwt.verify(token, process.env.APP_SECRET_KEY);
      const hashPassword = bcrypt.hashSync(password, bcryptSalt);

      jwt.verify(token, process.env.APP_SECRET_KEY, async (err) => {
        if (err) {
          throw new Error("Token expired");
        } else {
          const users = await model.users.findOne({
            where: { email: decode.email },
          });

          if (!users) {
            throw new Error("User not found");
          } else {
            await model.users.update(
              { password: hashPassword },
              { where: { id: users.dataValues.id } }
            );

            res.status(200).json({
              status: "OK",
              messages: "Reset password success",
              data: null,
            });
          }
        }
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
