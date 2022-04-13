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
    // Education
    {
      path: `${version}/educations/:userId`,
      controllers: require("../controllers/Education").getEducation,
    },
  // sosmed
  {
    path: `${version}/social-media/:userId`,
    controllers: require("../controllers/SocialMedia").getSosmed,
  },
  // skills
  {
    path: `${version}/skills/:userId`,
    controllers: require("../controllers/Skills").getSkills,
  },
  // Experince
  {
    path: `${version}/skills/:userId`,
    controllers: require("../controllers/Skills").getSkills,
    method: "get",
    cache: true,
  },
  {
    path: `${version}/social-media`,
    controllers: require("../controllers/SocialMedia").addSosmed,
    validator: require("../controllers/SocialMedia/validator").addSosMed,
    method: "post",
  },
  {
    path: `${version}/social-media/:id`,
    controllers: require("../controllers/SocialMedia").editSosmed,
    validator: require("../controllers/SocialMedia/validator").editSosmed,
    method: "patch",
  },
  {
    path: `${version}/social-media/:id`,
    controllers: require("../controllers/SocialMedia").deleteSosmed,
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
      path: `${version}/education`,
      controllers: require("../controllers/Education").addEducation,
      validator: require("../controllers/Education/validator").addEducation,
      method: "post",
    },
    {
      path: `${version}/education/:id`,
      controllers: require("../controllers/Education").editEducation,
      validator: require("../controllers/Education/validator").editEducation,
      method: "patch",
    },
    {
      path: `${version}/education/:id`,
      controllers: require("../controllers/Education").deleteEducation,
      method: "delete",
    },
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
    path: `${version}/experience`,
    controllers: require("../controllers/Experience").addExprience,
    validator: require("../controllers/Experience/validator").addExprience,
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
];
