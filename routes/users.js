var renderMain = require("../controllers/mainController")
var renderAuth = require("../controllers/authController")
var renderUser = require("../controllers/userController")
var renderContact = require("../controllers/contactController")
var renderNotification = require("../controllers/notificationController")
import express from 'express';
var router = express.Router();
/* --------------------------------- LIBRARY -------------------------------- */
import connectDatabase from "../config/connectDatabase"
import contactModel from "../models/contactModel"
import authValid from "../validation/authValidation"
import userValid from "../validation/userValidation"
import contactValid from '../validation/contactValidation';
import passport from "passport"

import initPassportLocal from "../controllers/passportControllers/local"
import initPassportFacebook from "../controllers/passportControllers/facebook"

//Connect to MongoDB
connectDatabase();

// init passport
initPassportLocal();

initPassportFacebook();

/* --------------------------------- ROUTER --------------------------------- */
router.get('/login-register', renderAuth.checkLogout, renderAuth.indexLoginRegister) // Login Local

router.post('/register', renderAuth.checkLogout, authValid.register, renderAuth.postRegister);

router.get('/active/:code', renderAuth.checkLogout, renderAuth.activeUser);

router.post("/login", renderAuth.checkLogout, passport.authenticate("local", {
    successRedirect: "/users/main",
    failureRedirect: "/users/login-register",
    succesFlash: true,
    failureFlash: true
}))

router.get('/auth/facebook', renderAuth.checkLogout, passport.authenticate("facebook", {
    scope: ["email"]
}))

router.get('/auth/facebook/callback', renderAuth.checkLogout, passport.authenticate("facebook", {
    successRedirect: "/users/main",
    failureRedirect: "/users/login-register"
}))

router.get('/main', renderAuth.checkLogin, renderMain.getMain);

router.get("/logout", renderAuth.checkLogin, renderAuth.postLogout)

router.put("/updateAvatar", renderAuth.checkLogin, renderUser.updateAvatar)

router.put("/updateInfoUser", renderAuth.checkLogin, userValid.validationUpdate, renderUser.updateInfo)

router.put("/updatePassword", renderAuth.checkLogin, userValid.validationUpdatePwd ,renderUser.updatePassword)

router.get("/contact/find-user/:keySearch",renderAuth.checkLogin, contactValid.validationKeySearch, renderContact.findUserContact)

router.post("/contact/addNewContact",renderAuth.checkLogin, renderContact.addNewContact)

router.delete("/contact/removeRequestContact",renderAuth.checkLogin, renderContact.removeReqContact)

router.get("/notification/loadMoreNotification", renderAuth.checkLogin, renderNotification.loadMore)

router.post("/notification/markReadAllNotification", renderAuth.checkLogin, renderNotification.markReadAll)

module.exports = router;