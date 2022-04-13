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

  // company
  {
    path: `${version}/company`,
    controllers: require("../controllers/Company").getCompany,
    method: "get",
    cache: true,
  },
  {
    path: `${version}/company`,
    controllers: require("../controllers/Company").addCompany,
    validator: require("../controllers/Company/validator").addCompany,
    method: "post",
  },
  {
    path: `${version}/company/:id`,
    controllers: require("../controllers/Company").editCompany,
    method: "patch",
  },
  {
    path: `${version}/company/:id`,
    controllers: require("../controllers/Company").deleteCompany,
    method: "delete",
  },
  {
    path: `${version}/company/:id`,
    controllers: require("../controllers/Company").findCompany,
    method: "get",
    cache: true,
  },

  // jobs
  {
    path: `${version}/jobs`,
    controllers: require("../controllers/Jobs").getJobs,
    method: "get",
    cache: true,
  },
  {
    path: `${version}/jobs/:id`,
    controllers: require("../controllers/Jobs").findJobs,
    method: "get",
    cache: true,
  },
  {
    path: `${version}/jobs/company/:id`,
    controllers: require("../controllers/Jobs").getCompanyJobs,
    method: "get",
    cache: true,
  },

  // application
  {
    path: `${version}/application`,
    controllers: require("../controllers/Application").getApplication,
    method: "get",
    cache: true,
  },

  // skills
  {
    path: `${version}/skills/:userId`,
    controllers: require("../controllers/Skills").getSkills,
    method: "get",
    cache: true,
  },
  {
    path: `${version}/skill`,
    controllers: require("../controllers/Skills").addSkill,
    validator: require("../controllers/Skills/validator").addSkill,
    method: "post",
  },
  {
    path: `${version}/skill/:id`,
    controllers: require("../controllers/Skills").editSkill,
    validator: require("../controllers/Skills/validator").editSkill,
    method: "patch",
  },
  {
    path: `${version}/skill/:id`,
    controllers: require("../controllers/Skills").deleteSkill,
    method: "delete",
  },

  //profile
    {
      path: `${version}/profile/:userId`,
      controllers: require("../controllers/Profile").getProfile,
      method: "get",
      cache: true,
    },
    {
      path: `${version}/profile/:userId`,
      controllers: require("../controllers/Profile").addProfile,
      validator: require("../controllers/Profile/validator").addProfile,
      method: "post",
    },
    {
      path: `${version}/profile/:userId`,
      controllers: require("../controllers/Profile").editProfile,
      validator: require("../controllers/Profile/validator").addProfile,
      method: "patch",
    },
    {
      path: `${version}/profile/::userId`,
      controllers: require("../controllers/Profile").deleteProfile,
      method: "delete",
    },
];
