import UserModel from '../models/userModel';

var updateUser = (id, item) => {
    return UserModel.updateInfoUser(id, item)
}

module.exports = {
    updateUser: updateUser
}