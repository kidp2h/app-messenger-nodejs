import multer from 'multer';
import {paths} from "../config/pathStorage"
import {transErrors,transSuccess} from "../lang/vi"
import uuid from 'uuid/v4';
import handleUser from '../handleUser/handleUser';
import fse from 'fs-extra';
import resultValid from "express-validator/check"

// init storage to save file image user upload
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

// define multer
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
            if(req.user.avatar = "defaultUser.png"){

            }else{
                let rm = await fse.remove(`${paths.avatarStorage}/${userUpdate.avatar}`)
            }
            
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
        var arrErrors = [];
        var objResult = resultValid.validationResult(req) // check data

        if (objResult.isEmpty() === false) {
            var arrResult = objResult.array()

            arrResult.forEach(element => {
                arrErrors.push(element.msg)
            });

            return res.status(500).send(arrErrors)
        }

        let infoUser = req.body;
        let userUpdate = await handleUser.updateUser(req.user._id, infoUser) // update data to database

        let result = {
            messageSuccess: transSuccess.infoUpdated
        }

        return res.status(200).send(result)

    } catch (error) {
        return res.status(500).send(error)
    }

}

let updatePassword = async (req,res) => {
    try {
        var arrErrors = [];

        var objResult = resultValid.validationResult(req)

        if (objResult.isEmpty() === false) {

            var arrResult = objResult.array()

            arrResult.forEach(element => {
                arrErrors.push(element.msg)
            });
            return res.status(500).send(arrErrors)

        }
        let dataPw = req.body
        
        let updatePw = await handleUser.updatePwd(req.user._id,dataPw)
        if(updatePw == true){
            var result = {
                messageSuccess : transSuccess.passwordUpdated,
                type : "success"
            }
            return res.status(200).send(result)
        }else{
            var result = {
                messageSuccess : updatePw,
                type : "error"
            }
            return res.status(200).send(result)
        }

    
    } catch (error) {
        return res.status(500).send(error)
    }
    
}


module.exports = {
    updateAvatar: updateAvatar,
    updateInfo: updateInfo,
    updatePassword: updatePassword
}