import passport from "passport"
import passportFacebook from "passport-facebook"
import UserModel from "../../models/userModel"
import {transErrors, transSuccess} from "../../lang/vi"

let FacebookStrategy = passportFacebook.Strategy

const fbAppID = process.env.CLIENT_ID
const fbKeySecret = process.env.KEY_SECRET
const fbCallbackURL = process.env.CALLBACK_URL
let initPassportFacebook = () => {
    passport.use(new FacebookStrategy({
        clientID : fbAppID,
        clientSecret : fbKeySecret,
        callbackURL :fbCallbackURL,
        passReqToCallback : true,
        profileFields:["email","gender","displayName"]

    },async (req, accessToken, refreshToken, profile, done) => {
        let user = await UserModel.findFacebookByUID(profile.id)
        if(user){
            return done(null,user,req.flash("success",transSuccess.loginSuccess))
            console.log(profile)
        }else{
            console.log(profile)
            //create user in database
            let newUserFacebook = {
                username : profile.displayName,
                gender : profile.gender,
                local : {isActive : true},
                facebook :{
                    uid: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value
                }
            }
            let newUser = await UserModel.createNewRecord(newUserFacebook)
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
module.exports = initPassportFacebook