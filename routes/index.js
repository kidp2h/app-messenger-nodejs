var express = require('express');
var router = express.Router();
var connectDatabase = require("../config/connectDatabase")
var contactModel = require("../models/contact.model")
//Connect to MongoDB
connectDatabase();
/* GET home page. */
router.get('/test', async function (req, res, next) {
  let itemObj = {
    id :"1",
    userId: "231",
    contactId: "3434",
  }
  result = await contactModel.createNewRecord(itemObj)
  console.log(result)
  res.send(result);
  
});
router.get('/',  function (req, res, next) {
  
  res.render("auth/loginRegister")
  
});
router.get('/main',  function (req, res, next) {
  
  res.render("main/main")
  
});

module.exports = router;