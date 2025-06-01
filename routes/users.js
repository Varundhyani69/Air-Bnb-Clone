const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
let userController = require("../controllers/users.js");
const user = require("../models/user.js");

router.get("/signup",userController.signup);

router.post("/signup",wrapAsync(userController.renderSignup));

router.get("/login",
    userController.renderLogin)

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect: '/login', failureFlash: true }), 
    userController.checkLogin
);

router.get("/logout",userController.logout);

module.exports = router;

