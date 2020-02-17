import result from "express-validator/check"
var indexLoginRegister = (req, res) => {
    
    res.render("auth/loginRegister")
}
var postRegister = (req, res) => {
    var arrErrors = [];
    var objResult =  result.validationResult(req)
    //console.log(objResult.isEmpty())
    
    if(objResult.isEmpty() === false){
        var arrResult = objResult.array()
        arrResult.forEach(element => {
            arrErrors.push(element.msg)
        });
        console.log(arrErrors);
    }else{
        console.log(req.body);
    }
    
    //console.log(objResult.mapped())
    //let arrResult = Object.values(objResult.mapped())
    
}
module.exports = {
    indexLoginRegister : indexLoginRegister,
    postRegister : postRegister
}