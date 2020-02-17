var renderMain = require("../controllers/mainController")
var renderAuth = require("../controllers/authController")
import express from 'express';
var router = express.Router();
import connectDatabase from "../config/connectDatabase"
import contactModel from "../models/contact.model"
import {auth , main} from "../controllers/index"
//import authValid from "../validation/index"
import authValid from "../validation/authValidation"


//Connect to MongoDB
connectDatabase();

router.post('/register', authValid.register, renderAuth.postRegister);

module.exports = router;