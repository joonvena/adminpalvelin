const express = require('express');
const Admin = require('../models/Admin');


function findOneById(req, res, next) {
    let email = req.user.email;
    Admin.findOne({email: email})
        .then(profile => res.json(profile));
}

function AddAdmin(req, res) {
    Admin.create(req.body)
        .then(res.send("Admin created"));
}


// here all kinds of features: update profile, update one part of a profile, delete profile ...

module.exports = {AddAdmin, findOneById};
