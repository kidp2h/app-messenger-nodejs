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


//Connect to MongoDB
connectDatabase();

initPassportLocal();
router.get('/login-register',renderAuth.checkLogout,renderAuth.indexLoginRegister)

router.post('/register',renderAuth.checkLogout, authValid.register, renderAuth.postRegister);
router.get('/active/:code',renderAuth.checkLogout,renderAuth.activeUser);
router.post("/login",renderAuth.checkLogout,passport.authenticate("local",{
    successRedirect : "/users/main",
    failureRedirect :"/users/login-register",
    succesFlash : true,
    failureFlash : true


}))
router.get('/main',renderAuth.checkLogin,renderMain);
router.get("/logout",renderAuth.checkLogin,renderAuth.postLogout)
module.exports = router;