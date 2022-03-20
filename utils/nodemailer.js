require("dotenv").config();
const nodemailer = require("nodemailer");
const mustache = require("mustache");
const { EMAIL_NAME, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = process.env;

const email = async (payload) => {
  const configMail = {
    host: EMAIL_HOST,
    port: EMAIL_PORT || 465,
    auth: {
      user: EMAIL_NAME,
      pass: EMAIL_PASS,
    },
  };
  const transporter = nodemailer.createTransport(configMail);
  const mailOptions = {
    from: EMAIL_NAME,
    to: payload.email,
    subject: payload?.subject ?? "No subject",
    html: mustache.render(payload.template, { ...payload }),
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      err ? reject(Error(err)) : resolve(info);
    });
  });
};

module.exports = email;
