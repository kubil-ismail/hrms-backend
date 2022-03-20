const version = "/v1";

module.exports = [
  {
    path: `${version}/users`,
    controllers: require("../controllers/Users").getUser,
    method: "get",
    cache: true,
  },
  {
    path: `${version}/auth/reset-password`,
    controllers: require("../controllers/Auth").resetPassword,
    method: "post",
  },
];
