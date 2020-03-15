import UserModel from '../models/userModel';
import ContactModel from '../models/contactModel';
import NotificationModel from '../models/notificationModel'


let getNotification = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resultNoti = await NotificationModel.model.getNotificationByIdUserAndLimit(currentUserId,10)
            let allNotification = []
            resultNoti.forEach(noti => {
                allNotification.push(noti._doc)
            });

            let getNotification = allNotification.map(async (notify) => {
                let resultInfoUser = await UserModel.findUserById(notify.senderId)
                return NotificationModel.contents.getContent(notify.type, notify.isRead, notify.senderId, resultInfoUser.username, resultInfoUser.avatar)
            })
            resolve(await Promise.all(getNotification));
        } catch (error) {
            reject(error)
        }
    })
}

let getCountNotiUnRead = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await NotificationModel.model.getCountNotificationUnread(currentUserId)
            resolve(count.length);  
        } catch (error) {
            reject(error)
        }
    })
}
let loadMore = (currentUserId,skipNumber) => {
    return new Promise(async (resolve,reject) => {
        try {
            let data = await NotificationModel.model.loadMoreNotification(currentUserId,skipNumber)
            let getNotification = data.map(async (notify) =>{
                let resultNotifications = await UserModel.findUserById(notify.senderId)
                return NotificationModel.contents.getContent(notify.type, notify.isRead, notify.senderId, resultNotifications.username, resultNotifications.avatar)
            })
            resolve(await Promise.all(getNotification))
        } catch (error) {
            reject(error)
        }
    })
}
let markReadAll = (currentUserId, notifications) => {
    return new Promise(async (resolve, reject) => {
        try{
            //console.log(typeof notifications); // ->> string , so I convert to array
            let notificationsArr = JSON.parse(notifications);
            let data = await NotificationModel.model.markReadAllNotification(currentUserId,notificationsArr)
            console.log(data);
            return resolve(data)
        }catch(error){
            console.log(error);
            return reject(false)
        }
    })
}
module.exports = {
    getNotification: getNotification,
    getCountNotiUnRead: getCountNotiUnRead,
    loadMore: loadMore,
    markReadAll : markReadAll
}