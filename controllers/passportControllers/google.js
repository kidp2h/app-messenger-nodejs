import passport from "passport"
import passportGoogle from "passport-google-oauth"
import UserModel from "../../models/userModel"
import {transErrors, transSuccess} from "../../lang/vi"

let GoogleStrategy = passportGoogle.OAuth2Strategy

const ggAppID = process.env.GG_CLIENT_ID
const ggKeySecret = process.env.GG_KEY_SECRET
const ggCallbackURL = process.env.GG_CALLBACK_URL
let initPassportGoogle = () => {
    passport.use(new GoogleStrategy({
        clientID : ggAppID,
        clientSecret : ggKeySecret,
        callbackURL :ggCallbackURL,
        passReqToCallback : true
    },async (req, accessToken, refreshToken, profile, done) => {
        let user = await UserModel.findGoogleByUID(profile.id)
        if(user){
            return done(null,user,req.flash("success",transSuccess.loginSuccess))
        }else{
            //create user in database
            let newUserGoogle = {
                username : profile.displayName,
                gender : profile.gender,
                local : {isActive : true},
                google :{
                    uid: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value
                }
            }
            let newUser = await UserModel.createNewRecord(newUserGoogle)
            return done(null,newUser,req.flash("success",transSuccess.loginSuccess))
        }
        
    }))

//save userId to session
passport.serializeUser((user, done) => {
    done(null,user._id)
})
//this call by passport session and save on variable req.user
passport.deserializeUser((id, done) =>{
    UserModel.findUserById(id)
        .then(user => {
            return done(null,user)
        })
        .catch(error => {
            return done(error,null)
        })
})
}
module.exports = initPassportGoogle