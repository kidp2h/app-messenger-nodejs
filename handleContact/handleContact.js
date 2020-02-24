import UserModel from '../models/userModel';
import ContactModel from '../models/contactModel';
import _ from 'lodash/array';


let findUserContact = (currentIdUser, keySearch) => {
    return new Promise( async (resolve, reject) => {
        let deprecatedUser = [currentIdUser]
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
let addNewContact = async (idUser,idContact) => {
    let checkExist = await ContactModel.checkExistContact(idUser,idContact)
    if(checkExist == null){
        let itemContact = {
            "userId":idUser,
            "contactId":idContact
        }
        let addNew = await ContactModel.createNewRecord(itemContact)
        return true
    }else{
        return false
    }
    
}
let removeReqContact = async (idUser,idContact) => {
    let checkExist = await ContactModel.checkExistContact(idUser,idContact)
    if(checkExist){
        let remove = await ContactModel.removeContact(idUser,idContact)
        if(remove.result.ok == 1){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

module.exports = {
    findUserContact: findUserContact,
    addNewContact: addNewContact,
    removeReqContact: removeReqContact
}