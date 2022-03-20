const version = "/v1";

module.exports = [
  {
    path: `${version}/auth/login`,
    controllers: require("../controllers/Auth").login,
    validator: require("../controllers/Auth/validator").loginValidator, // global validator
    method: "post",
  },
  {
    path: `${version}/auth/register`,
    controllers: require("../controllers/Auth").register,
    validator: require("../controllers/Auth/validator").registValidator,
    method: "post",
  },
  {
    path: `${version}/auth/forgot`,
    controllers: require("../controllers/Auth").forgot,
    validator: require("../controllers/Auth/validator").forgetValidator,
    method: "post",
  },
  {
    path: `${version}/forgot/verify`,
    controllers: require("../controllers/Auth").forgotVerify,
    method: "get",
  },
  {
    path: `${version}/activate`,
    controllers: require("../controllers/Auth").activate,
    method: "get",
  },
  {
    path: `${version}/auth/logout/:id`,
    controllers: require("../controllers/Auth").logout,
    method: "get",
  },
];
