import result from "express-validator/check"
import handleAuth from "../handleAuth/handleAuth"
import {transSuccess} from "../lang/vi"

var indexLoginRegister = (req, res) => {
    res.render("auth/loginRegister", {
        errors: req.flash("errors"),
        success: req.flash("success")
    })
}

var postRegister = async (req, res) => {
    var arrErrors = [];

    var objResult = result.validationResult(req) // check data when user register 
    if (objResult.isEmpty() === false) {
        var arrResult = objResult.array()
        arrResult.forEach(element => {
            arrErrors.push(element.msg)
        });
        req.flash("errors", arrErrors) // send notification to view when data not illegal
        res.redirect("/users/login-register")
    } else {
        let result = await handleAuth.registerUser(req.body.email, req.body.password, req.body.gender, req.protocol, req.get("host"))
        if (result) {
            req.flash("errors", result) // if account exist ,...
            res.redirect("/users/login-register")
        } else {
            req.flash("success", transSuccess.registerSuccess) // send notification to view if true
            res.redirect("/users/login-register")
        }

    }


}

var activeUser = async (req, res) => {
    let codeActive = req.params.code;
    let result = await handleAuth.activeUser(codeActive)
    if (result) {
        req.flash("errors", result)
        res.redirect("/users/login-register")
    } else {
        req.flash("success", transSuccess.activeSuccess)
        res.redirect("/users/login-register")
    }

}
var postLogout = (req, res) => {
req.logout()
req.flash("success",transSuccess.logoutSuccess)
res.redirect("/users/login-register")
}
var checkLogin = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/users/login-register")
    }else{
        next();
    }
}

var checkLogout = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect("/users/main")
    }else{
        next();
    }
}

module.exports = {
    indexLoginRegister: indexLoginRegister,
    postRegister: postRegister,
    activeUser: activeUser,
    postLogout: postLogout,
    checkLogin : checkLogin,
    checkLogout : checkLogout
}