const express=require("express");
const wrapError = require("../utils/wrapError");
const User=require("../models/user.js");
const passport = require("passport");
const { SaveRediectUrl } = require("../AuthenticationMiddleware.js");
const router=express.Router();
const userController=require("../controller/userController.js");
router.get("/signUp",userController.CreateForm);

router.post("/signUp",wrapError(userController.signUp));

router.get("/login",userController.login);

router.post("/login",SaveRediectUrl,passport.authenticate("local",{
  failureRedirect:"/login",
  failureFlash:true}),userController.loginPost);



router.get("/logout",userController.destroyUser)
module.exports=router;