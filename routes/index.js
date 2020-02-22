// var express = require('express');
// var router = express.Router();
// var connectDatabase = require("../config/connectDatabase")
// var contactModel = require("../models/contact.model")

//Connect to MongoDB
import connectDatabase from "../config/connectDatabase"
connectDatabase();

import renderMain from "../controllers/mainController"
import renderAuth  from "../controllers/authController"

import express from 'express';

var router = express.Router();

import contactModel from "../models/contactModel"
import {auth , main} from "../controllers/index"

import authValid from "../validation/authValidation"


module.exports = router;