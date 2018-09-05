const express = require('express');
const InsuranceClaim = require('../models/InsuranceClaim');
const profileAdminDBservice = require('../services/profileAdminDBservice');


function createClaim(req, res) {
    let customerId = req.body.userid;
    InsuranceClaim.create(req.body)
        .then((document) =>
            profileAdminDBservice.updateCustomerClaims(document.userid, document._id));
}

function findById(req, res) {
    InsuranceClaim.find({userid: req.body._id})
        .then(insurances => res.json(insurances))
}

module.exports = {createClaim, findById};
