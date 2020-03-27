var mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ContactSchema = new Schema({
    id: String,
    userId: String,
    contactId: String,
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    updatedAt: {
        type: Number,
        default: null
    },
    deletedAt: {
        type: Number,
        default: null
    }

})
//create item in mongodb
ContactSchema.statics = {
    /**
     * create new record
     * @param {Object} itemObj 
     */
    createNewRecord(itemObj) {
        return this.create(itemObj);
    },
    findAllByIdUser(idUser) {
        return this.find({
            $or: [ {"userId": idUser}, {"contactId": idUser} ]
        }).exec();
    },
    checkExistContact(userId, contactId){
        return this.findOne({
            $or : [
                { $and :[ {"userId":userId}, {"contactId": contactId} ] },
                { $and :[ {"userId":contactId}, {"contactId": userId} ] },
            ]
        }).exec()
    },
    removeContact(userId, contactId){
        return this.remove({
            $and : [ {"userId":userId}, {"contactId": contactId} ]
        }).exec()
        
    },
    getContacts(userId){
        return this.find({
            $and : [ 
                {$or : [ {"userId": userId}, {"contactId": userId} ]},
                {"status":false}
            ]
        }).lean().exec()
    },
    getContactsNotConfirm(userId){
        return this.find({
            $and : [ 
                {$or : [ {"userId": userId}, {"contactId": userId} ]},
                {"status":false}
            ]
        }).lean().exec()
    },
}
module.exports = mongoose.model("contact", ContactSchema)