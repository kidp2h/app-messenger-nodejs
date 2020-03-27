import UserModel from '../models/userModel';
import ContactModel from '../models/contactModel';
import NotificationModel from '../models/notificationModel'
import _ from 'lodash/array';


let findUserContact = (currentIdUser, keySearch) => {
    return new Promise( async(resolve, reject) => {
        let deprecatedUser = [currentIdUser] // declare to filter users is friends and user themselves
        let allContactUser = await ContactModel.findAllByIdUser(currentIdUser)
        allContactUser.forEach(contact => {
            deprecatedUser.push(contact.userId)
            deprecatedUser.push(contact.contactId)
        });
        var arrFilter = _.uniqBy(deprecatedUser); // filter users is friend and user themselves
        let result = await UserModel.findAllUserForAddContact(arrFilter,keySearch)
        return resolve(result)
    })
    
    
}

let addNewContact = async (idUser,idContact) => {
    return new Promise(async (resolve, reject) => {
        let checkExist = await ContactModel.checkExistContact(idUser,idContact)
        if(checkExist == null){
            let itemContact = {
                "userId":idUser,
                "contactId":idContact
            }
            await ContactModel.createNewRecord(itemContact)
            let notificationItem = {
                senderId: idUser,
                receiverId: idContact,
                type : NotificationModel.types.ADD_CONTACT,
            }
            await NotificationModel.model.createNewRecord(notificationItem)
            return resolve(true)
        }else{
            return resolve(false)
        }
        
    })
    
}
let removeReqContact = async (idUser,idContact) => {
    let checkExist = await ContactModel.checkExistContact(idUser,idContact)
    if(checkExist){
        let remove = await ContactModel.removeContact(idUser,idContact)
        if(remove.result.ok == 1){
            await NotificationModel.model.removeRequestAddContact(idUser, idContact, NotificationModel.types.ADD_CONTACT)
            return true  
        }else{
            return false
        }
    }else{
        return false
    }
}
let getContacts = async (idUser) => {
    return new Promise(async (resolve,reject) => {
        try {
            let result = await ContactModel.getContacts(idUser)
            //get data from result
            let getDataFromResult = result.map(async (item) => {
                let resultInfoUser = await UserModel.findUserLeanById(item.userId)
                return resultInfoUser
            })
            resolve(await Promise.all(getDataFromResult)) 
        return resolve(result)
        } catch (error) {
            return reject(error)
        }
        
    })
}

module.exports = {
    findUserContact: findUserContact,
    addNewContact: addNewContact,
    removeReqContact: removeReqContact,
    getContacts: getContacts
}