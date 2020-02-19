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

router.post('/register', authValid.register, renderAuth.postRegister);
router.get('/active/:code',renderAuth.activeUser);
router.post("/login",passport.authenticate("local",{
    successRedirect : "/main",
    failureRedirect :"/login-register",
    succesFlash : true,
    failureFlash : true


}))
module.exports = router;