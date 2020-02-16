var express = require('express');
var router = express.Router();
import connectDB from "./config/connectDatabase"
import contactModel from "./models/contact.model"
//Connect to MongoDB
connectDB();
/* GET home page. */
router.get('/test', function (req, res, next) {
  let itemObj = {
    id :"1",
    userId: "231",
    contactId: "3434",
  }
  result = contactModel.createNewRecord(itemObj)
  console.log(result)
  res.send(result);
  
});

module.exports = router;