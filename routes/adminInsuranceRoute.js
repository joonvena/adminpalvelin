const express = require('express');
const router = express.Router();
const insurancedbservice = require('../services/insuranceAdminDBservice');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const passport = require('passport');
const User = require('../models/User');


router.get('/id/:id', passport.authenticate('jwt',
    {session: false}), (req, res) => {
    insurancedbservice.findOneById(req, res);
});

router.get('/customer/:id', (req, res) => {
    insurancedbservice.deleteCustomerInsurance(req, res);
});


router.get('/customer/:id', passport.authenticate('jwt',
    {session: false}), (req, res) => {
    insurancedbservice.findAllByUserID(req, res)
});

router.post('/create', (req, res) => {
    insurancedbservice.createInsuranceAndUpdateCustomer(req, res)
});

//@Route /omavakuutus/:vakuutusID
//GET this shows the information of one information
//Private
router.post('/update', (req, res, next) => {

    insurancedbservice.updateOneById(req.body)
});

//DEV ROUTE add a claim to the claim database from Customer Clien


module.exports = router;