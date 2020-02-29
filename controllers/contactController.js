
import handleContact from '../handleContact/handleContact';
import resultValid from "express-validator/check"
let findUserContact = async (req, res) => {
    
    try {
        var arrErrors = [];

    var objResult = resultValid.validationResult(req)

    if (objResult.isEmpty() === false) {

        var arrResult = objResult.array()

        arrResult.forEach(element => {
            arrErrors.push(element.msg)
        });
        console.log(arrErrors);
        return res.status(500).send(arrErrors)

    }
    
        let newArr = []
        let keySearch = req.params.keySearch
        let currentIdUser = req.user._id
        let result = await handleContact.findUserContact(currentIdUser, keySearch)
        result.forEach(element => {
            newArr.push(element._doc);
        });
        return res.render("main/listFindUsers",{users:newArr})
    } catch (error) {
        res.status(500).send(error)
    }
    
    
}

let addNewContact = async (req, res) => {
    try {
        let contactId = req.body.cId
        let currentUserId = req.user._id
        let result = await handleContact.addNewContact(currentUserId, contactId)
        //console.log(result);
        if(result){
            res.status(200).send({success: result})
        }else{
            res.status(500).send({success: result})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
let removeReqContact = async (req, res) => {
    try {
        let contactId = req.body.uid
        let currentUserId = req.user._id
        let result = await handleContact.removeReqContact(currentUserId, contactId) 
        if(result){
            res.status(200).send({success: result})
        }else{
            res.status(500).send({success: result})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {
    findUserContact: findUserContact,
    addNewContact: addNewContact,
    removeReqContact:removeReqContact
}