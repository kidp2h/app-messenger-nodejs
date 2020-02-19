import UserModel from "../models/userModel"
import bcrypt from "bcrypt";
import uuid from "uuid/v4"
import {transErrors} from "../lang/vi"
const saltRounds = 10;

let salt = bcrypt.genSaltSync(saltRounds)

var registerUser = async (email, password, gender) => {
    let checkEmail = await UserModel.findEmail(email)
    if (checkEmail) {
        return transErrors.emailExist
    }else if(checkEmail.local.isActive === false){
        return transErrors.unActive
    }else if(checkEmail.deletedAt != null){
        return transErrors.userDeleted
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
    }
}


module.exports = {
    registerUser: registerUser
}