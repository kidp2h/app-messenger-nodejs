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
    //var arrSuccess = []
    var objResult = result.validationResult(req)

    if (objResult.isEmpty() === false) {
        var arrResult = objResult.array()
        arrResult.forEach(element => {
            arrErrors.push(element.msg)
        });
        console.log(arrErrors);
        req.flash("errors", arrErrors)
        res.redirect("/login-register")
    } else {
        let result = await handleAuth.registerUser(req.body.email, req.body.password, req.body.gender, req.protocol, req.get("host"))
        if (result) {
            req.flash("errors", result)
            res.redirect("/login-register")
        } else {
            req.flash("success", transSuccess.registerSuccess)
            res.redirect("/login-register")
        }

    }


}
var activeUser = (req, res) => {
    let codeActive = req.params.code;
    let result = handleAuth.activeUser(codeActive)
    if (result) {
        req.flash("errors", result)
        res.redirect("/login-register")
    } else {
        req.flash("success", transSuccess.activeSuccess)
        res.redirect("/login-register")
    }

}
var postLogin = (req, res) => {

}
module.exports = {
    indexLoginRegister: indexLoginRegister,
    postRegister: postRegister,
    activeUser: activeUser
}