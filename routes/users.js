var renderMain = require("../controllers/mainController")
var renderAuth = require("../controllers/authController")

import express from 'express';
var router = express.Router();

import connectDatabase from "../config/connectDatabase"
import contactModel from "../models/contactModel"
import {auth , main} from "../controllers/index"
import authValid from "../validation/authValidation"
import passport from "passport"

import initPassportLocal from "../controllers/passportControllers/local"
import initPassportFacebook from "../controllers/passportControllers/facebook"


//Connect to MongoDB
connectDatabase();

initPassportLocal();
initPassportFacebook();

router.get('/login-register',renderAuth.checkLogout,renderAuth.indexLoginRegister) // Login Local

router.post('/register',renderAuth.checkLogout, authValid.register, renderAuth.postRegister);

router.get('/active/:code',renderAuth.checkLogout,renderAuth.activeUser);

router.post("/login",renderAuth.checkLogout,passport.authenticate("local",{
    successRedirect : "/users/main",
    failureRedirect :"/users/login-register",
    succesFlash : true,
    failureFlash : true
}))

router.get('/auth/facebook',renderAuth.checkLogout,passport.authenticate("facebook",{scope :["email"]}))

router.get('/auth/facebook/callback',renderAuth.checkLogout,passport.authenticate("facebook",{
successRedirect : "/users/main",
failureRedirect :"/users/login-register"
}))

router.get('/main',renderAuth.checkLogin,renderMain);

router.get("/logout",renderAuth.checkLogin,renderAuth.postLogout)

module.exports = router;