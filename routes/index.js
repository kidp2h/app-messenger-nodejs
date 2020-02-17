// var express = require('express');
// var router = express.Router();
// var connectDatabase = require("../config/connectDatabase")
// var contactModel = require("../models/contact.model")
import renderMain from "../controllers/mainController"
import renderAuth  from "../controllers/authController"
import express from 'express';
var router = express.Router();
import connectDatabase from "../config/connectDatabase"
import contactModel from "../models/contact.model"
import {auth , main} from "../controllers/index"
//import authValid from "../validation/index"
import authValid from "../validation/authValidation"

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
router.get('/',  renderAuth.indexLoginRegister)
router.get('/main',  renderMain);
router.post('/register', authValid.register, renderAuth.postRegister);

module.exports = router;