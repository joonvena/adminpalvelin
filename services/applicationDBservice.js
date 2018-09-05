const express = require('express');
const InsuranceApplication = require('../models/InsuranceApplication');


function findOneById(req, res, next) {
    let id = req.params.id;
    InsuranceApplication.findOne({_id: id})
        .then(application => res.json(application));
}

function createOne(req, res) {
    InsuranceApplication.create(req.body)
        .then((application) => {
            res.json(application)
        })
}

function findAll(req, res, next) {
    InsuranceApplication.find({})
        .then(applications => res.json(applications));
}

function deleteOneById(id) {
    InsuranceApplication.deleteOne({_id: id}, function (err, insurance) {
    }).catch(next);
}


// here all kinds of features: update profile, update one part of a profile, delete profile ...

module.exports = {createOne, findOneById, deleteOneById, findAll};
