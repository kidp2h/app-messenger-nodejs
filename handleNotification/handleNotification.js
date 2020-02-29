import UserModel from '../models/userModel';
import ContactModel from '../models/contactModel';
import NotificationModel from '../models/notificationModel'
import { resolve, reject } from 'bluebird';


let getNotification =  (currentUserId) => {
    return new Promise(async (resolve,reject) =>{
        let resultNoti = await NotificationModel.model.getNotificationByIdUserAndLimit(currentUserId)
    let allNotification = []
    let allData = []
    resultNoti.forEach(noti => {
        allNotification.push(noti._doc)
    });
    
    let getNotification = allNotification.map(async (notify) => {
        let resultInfoUser = await UserModel.findUserById(notify.senderId)
        return NotificationModel.contents.getContent(notify.type,notify.isRead,notify.senderId,resultInfoUser.username,resultInfoUser.avatar)
    })
    resolve(await Promise.all(getNotification));
    
    })
    
}

module.exports = {
    getNotification: getNotification
}