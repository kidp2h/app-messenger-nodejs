import UserModel from '../models/userModel';
import {transErrors,transSuccess} from "../lang/vi"
import bcrypt from "bcrypt";

const saltRounds = 10;

let salt = bcrypt.genSaltSync(saltRounds)

var updateUser = (id, item) => {
    return UserModel.updateInfoUser(id, item)
}

var updatePwd = async (id, dataUpdate) => {
    var currentUser =  await UserModel.findUserById(id)
    console.log(currentUser)
    if(!currentUser){
        return transErrors.userUndefined
    }
    let checkPw = await currentUser.comparePassword(dataUpdate.currentPassword)
    console.log("y :" +checkPw);
    if(!checkPw){
        return transErrors.currentPwd
    }
    console.log(dataUpdate);
    console.log(dataUpdate.newPassword);
        var hashedPwd = bcrypt.hashSync(dataUpdate.newPassword, salt)
        console.log(hashedPwd);
        console.log(id);
        let updatePassword = await UserModel.updateUserPassword(id,hashedPwd)
        return true;

}

module.exports = {
    updateUser: updateUser,
    updatePwd: updatePwd
}