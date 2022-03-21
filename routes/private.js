const version = "/v1";

module.exports = [
  // auth
  {
    path: `${version}/auth/reset-password`,
    controllers: require("../controllers/Auth").resetPassword,
    validator: require("../controllers/Auth/validator").resetPasswordValidator,
    method: "post",
  },
  // users
  {
    path: `${version}/user`,
    controllers: require("../controllers/Users").getUser,
    cache: true,
    method: "get",
  },
  {
    path: `${version}/user`,
    controllers: require("../controllers/Users").editUser,
    method: "patch",
  },
];
