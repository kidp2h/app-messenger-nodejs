import UserModel from '../models/userModel';
import ContactModel from '../models/contactModel';
import _ from 'lodash/array';


let findUserContact = (currentIdUser, keySearch) => {
    return new Promise( async (resolve, reject) => {
        let deprecatedUser = []
        let allContactUser = await ContactModel.findAllByIdUser(currentIdUser)
        //console.log(allContactUser);
        allContactUser.forEach(contact => {
            deprecatedUser.push(contact.userId)
            deprecatedUser.push(contact.contactId)
        });
        var arrFilter = _.uniqBy(deprecatedUser);
        let result = await UserModel.findAllUserForAddContact(arrFilter,keySearch)
        resolve(result)
    })
    
    
}
module.exports = {
    findUserContact: findUserContact
}