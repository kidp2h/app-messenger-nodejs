var mongoose = require("mongoose");
let Schema = mongoose.Schema;
let NotificationSchema = new Schema({
    senderId: String,
    receiverId: String,
    type: String,
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: Date.now
    }

});
const LIMIT_NOTIFICATION = 10 
NotificationSchema.statics = {
    createNewRecord(item) {
        return this.create(item);
    },
    removeRequestAddContact(senderId, receiverId, type) {
        return this.remove({
            $and: [{
                "senderId": senderId
            }, {
                "receiverId": receiverId
            }, {
                "type": type
            }]
        }).exec()



    },
    getNotificationByIdUserAndLimit(receiverId, limit) {
        return this.find({
            "receiverId": receiverId
        }).sort({
            "createdAt": -1
        }).limit(limit).exec()
    },
    getCountNotificationUnread(receiverId){
        return this.find({
            $and : [
                {"receiverId":receiverId},
                {"isRead":false}
            ]
        }).lean().exec()
    },
    loadMoreNotification(receiverId, skipNumber){
        return this.find({
            $and : [
                {"receiverId" : receiverId},{"isRead":false}
            ]
        }).sort({"createdAt": -1}).skip(skipNumber).limit(LIMIT_NOTIFICATION).lean().exec()
    }
}

const TYPES_NOTIFICATION = {
    ADD_CONTACT: "ADD_CONTACT"
}

const CONTENT_NOTIFICATION = {
    getContent: (typeNotify, isRead, senderId, usernameSender, avatar) => {
        if(typeNotify == TYPES_NOTIFICATION.ADD_CONTACT){
            if(isRead == false){
                return `<div class="not-read" data-uid="${senderId}"><img class="avatar-small" src="/images/users/${avatar}" alt=""><strong>${usernameSender}</strong> đã gửi cho bạn một lời mời kết bạn </div>`;
            }else{
                return `<div data-uid="${senderId}"><img class="avatar-small" src="/images/users/${avatar}" alt=""><strong>${usernameSender}</strong> đã gửi cho bạn một lời mời kết bạn </div>`;
            }
        
    }
    return "Nothing Notification"
}
}
module.exports = {
    model: mongoose.model("notification", NotificationSchema),
    types: TYPES_NOTIFICATION,
    contents : CONTENT_NOTIFICATION
}