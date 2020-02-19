import UserModel from "../models/userModel"
import bcrypt from "bcrypt";
import uuid from "uuid/v4"
import sendMailUser from "../config/mailer"
import {transErrors} from "../lang/vi"
import {transSuccess} from "../lang/vi"
import nodemailer from "nodemailer"

const saltRounds = 10;


let salt = bcrypt.genSaltSync(saltRounds)

var registerUser = async (email, password, gender,protocol,host) => {
    let checkEmail = await UserModel.findEmail(email)
    if (checkEmail) {
        return transErrors.emailExist
        if (checkEmail.local.isActive === false) {
            return transErrors.unActive
        } else if (checkEmail.deletedAt != null) {
            return transErrors.userDeleted
        }
    } else {
        let listItem = {
            username: email.split("@")[0],
            gender: gender,
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuid(),
            }

        }
        let result = await UserModel.createNewRecord(listItem)
        let linkActive = `${protocol}://${host}/users/active/${result.local.verifyToken}`
        
       // console.log(hostMail)
        //console.log(transSuccess.htmlContent(linkActive));

       console.log(sendMailUser(email,transSuccess.subject,transSuccess.htmlContent(linkActive)))
    }
}
var activeUser = async(codeActive) => {
    let action = await UserModel.active(codeActive)
    if(action === null){
        return transErrors.errorActive
    }
}


module.exports = {
    registerUser: registerUser,
    activeUser : activeUser
}