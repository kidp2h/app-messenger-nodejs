import passport from "passport"
import passportLocal from "passport-local"
import UserModel from "../../models/userModel"
import {
  transErrors,
  transSuccess
} from "../../lang/vi"

let LocalStrategy = passportLocal.Strategy

let initPassportLocal = () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done) => {
    let user = await UserModel.findEmail(email)
    if (!user) {
      return done(null, false, req.flash("errors", transErrors.loginFailed))
    }
    if (user.local.isActive == false) {
      return done(null, false, req.flash("errors", transErrors.unActive))
    }
    if (user.deletedAt != null) {
      return done(null, false, req.flash("errors", transErrors.userDeleted))
    }
    var resultCheckPassword = await user.comparePassword(password)
    if (!resultCheckPassword) {
      return done(null, false, req.flash("errors", transErrors.loginFailed))
    }
    return done(null, user, req.flash("success", transSuccess.loginSuccess))
  }))

  //save userId to session
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  //this call by passport session and save on variable req.user
  passport.deserializeUser((id, done) => {
    UserModel.findUserById(id)
      .then(user => {
        return done(null, user)
      })
      .catch(error => {
        return done(error, null)
      })
  })
}
module.exports = initPassportLocal