import multer from 'multer';
import {paths} from "../config/pathStorage"
import {transErrors,transSuccess} from "../lang/vi"
import uuid from 'uuid/v4';
import handleUser from '../handleUser/handleUser';
import fse from 'fs-extra';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, paths.avatarStorage)
    },
    filename: function (req, file, cb) {
        let extFile = ["image/png", "image/jpg", "image/jpeg"]
        if (extFile.indexOf(file.mimetype) === -1) {
            cb(transErrors.typeFile, null)
        } else {
            const fileImage = `${Date.now()}-${uuid()}-${file.originalname}`
            cb(null, fileImage)
        }
    }

})

var uploadFile = multer({
    storage: storage,
    limits: {
        fileSize: 1048576
    }
}).single("avatar");

let updateAvatar = (req, res) => {
    uploadFile(req, res, async (error) => {
        if (error) {
            console.log(error);
            if (error.message) {
                return res.status(500).send(transErrors.fileSize)
            } else {
                return res.status(500).send(transErrors.fileType)
            }
        } else {
            let avatarUpdate = {
                avatar: req.file.filename,
                updatedAt: Date.now(),
            }
            // update avatar to mongodb
            let userUpdate = await handleUser.updateUser(req.user._id, avatarUpdate)
            // remove avatar old
            let rm = await fse.remove(`${paths.avatarStorage}/${userUpdate.avatar}`)
            // send back ajax handle data 
            let result = {
                message: transSuccess.avatarUpdated,
                imageSource: `/images/users/${req.file.filename}`
            }
            console.log(result);
            return res.status(200).send(result)

        }
    })
}
let updateInfo = async (req, res) => {
    try {
        let infoUser = req.body;

        let userUpdate = await handleUser.updateUser(req.user._id, infoUser)

        let result = {
            messageSuccess: transSuccess.infoUpdated
        }
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(status)
    }

}

module.exports = {
    updateAvatar: updateAvatar,
    updateInfo: updateInfo
}