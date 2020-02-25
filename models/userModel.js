var mongoose = require("mongoose");
import bcrypt from "bcrypt"
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: String,
    gender: {
        type: String,
        default: "male"
    },
    phone: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: "defaultUser.png"
    },
    role: {
        type: String,
        default: "user"
    },
    local: {
        email: {
            type: String,
            trim: true
        },
        password: String,
        isActive: {
            type: Boolean,
            default: false
        },
        verifyToken: {
            type: String,
            default: null
        }
    },
    facebook: {
        uid: String,
        token: String,
        email: {
            type: String,
            trim: true
        }
    },
    google: {
        uid: String,
        token: String,
        email: {
            type: String,
            trim: true
        }
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
});
UserSchema.statics = {
    createNewRecord(itemObj) {
        return this.create(itemObj);
    },
    findEmail(email) {
        return this.findOne({
            "local.email": email
        }).exec();
    },
    active(token) {
        return this.findOneAndUpdate({
            "local.verifyToken": token
        }, {
            "local.isActive": true,
            "local.verifyToken": null
        }).exec();
    },
    findUserById(id) {
        return this.findById(id).exec();
    },
    findFacebookByUID(uid) {
        return this.findOne({
            "facebook.uid": uid
        }).exec();
    },
    updateInfoUser(id, item) {
        return this.findByIdAndUpdate(id, item).exec()
    },
    updateUserPassword(id, hashPwd) {
        return this.findByIdAndUpdate(id, {
            "local.password": hashPwd
        }).exec()
    },
    findAllUserForAddContact(deprecatedUserIds, keySearch) {
        return this.find({
            $and: [
                {"_id": {$nin: deprecatedUserIds}},
                {"local.isActive": true},
                {$or: [
                        {"username": {"$regex": keySearch}},
                        {"local.email": {"$regex": keySearch}},
                        {"facebook.email": {"$regex": keySearch}},
                        {"google.email": {"$regex": keySearch}}
                    ]}
            ]
        }, {
            _id: 1,
            address:1,
            username: 1,
            gender: 1,
            phone: 1,
            avatar: 1
            
        }).exec()
    }
}
UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.local.password);
    }
}
module.exports = mongoose.model("user", UserSchema)