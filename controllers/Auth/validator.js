module.exports = {
  loginValidator: {
    email: "required|email",
    password: "required",
  },
  registValidator: {
    email: "required|email",
    password: "required|minLength:8",
  },
  forgetValidator: {
    email: "required|email",
  },
  resetPasswordValidator: {
    token: "required",
    password: "required|minLength:8",
  },
};
