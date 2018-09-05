const express = require('express');
const Profile = require('../models/Profile');
const InsuranceClaim = require('../models/InsuranceClaim');
const applicationDBservice = require('../services/applicationDBservice');

//FINDS ALL PROFILES

function findAll(req, res) {
    Profile.find({})
        .then(profiles => res.json(profiles))
}

function findByEmail(req, res) {
    let email = req.body.email;
    Profile.findOne({email: email})
        .populate("profilesinsurances")
        .populate("profileclaims")
        .populate("profilesinvoices")
        .then(profile => res.json(profile));
}

function updateCustomerInvoices(customerId, data) {
    let id = customerId;
    console.log(id);
    console.log(data);
    Profile.findOne({_id: id})
        .populate("profilesinsurances")
        .populate("profileclaims")
        .populate("profilesinvoices")
        .then(profile => Profile.update({_id: profile._id}, {$push: {"profilesinvoices": data}}))

}

function updateCustomerClaims(customerId, data) {
    Profile.findOne({_id: customerId})
        .populate("profilesinsurances")
        .populate("profileclaims")
        .populate("profilesinvoices")
        .then(profile => Profile.update({_id: profile._id}, {$push: {"profileclaims": data}}))

}

function updateProfileInsurances(data, customerId, applicationId) {
    let id = customerId;
    Profile.findOne({_id: id})
        .populate("profilesinsurances")
        .populate("profileclaims")
        .populate("profilesinvoices")
        .then(profile => Profile.updateOne({_id: id}, {$push: {"profilesinsurances": data}})).then(
        promise => {
            applicationDBservice.deleteOneById(applicationId)
        }
    )
}

function sendCustomerAMessage(req, res) {
    const message = {
        "id": req.body.id,
        "Message": req.body.Message,
        "Sender": req.body.Sender,
        "messageId": req.body.messageId
    };
    Profile.update({_id: req.body.id}, {$push: {"profilemessages": message}}).then(profile => {
        res.json(profile)
    })
}


// FINDS PROFILE BY ID

function findOneById(req, res, next) {
    Profile.findOne({_id: req.params.id})
        .populate("profilesinsurances")
        .populate("profileclaims")
        .populate("profilesinvoices")
        .then(profile => res.json(profile));
}

//UPDATES A PROFILE BY ID

function updateOneById(req, res) {

}

//DELETES BY ID

function deleteOneById(req, res) {

}

//ADDS INSURANCE TO THE CUSTOMER

function AddInsuranceToACustomer(req, res) {
    /* The following should happen: 1) Insurance is created and added to the database. 2) InsuranceID
    is then set into the profile.*/

    Profile.findByIdandUpdate({_id: req.body.id}, req.body, (err, profile) => {
        res.send("Profile updated")
    });
}

function updateCustomerById(data) {
    return Profile.findByIdAndUpdate({_id: data._id}, data, (err, profile) => {
        return data;
    });
}

function AddProfile(req, res) {
    Profile.create(req.body)
        .then(res.send("Profile created"));
}

function deleteProfile(req, res) {
    Profile.deleteOne({_id: req.params.id}, (err, profile) => {
        res.send('Profile deleted')
    })
}

// here all kinds of features: update profile, update one part of a profile, delete profile ...

module.exports = {
    sendCustomerAMessage,
    updateCustomerInvoices,
    updateProfileInsurances,
    updateCustomerClaims,
    deleteProfile,
    findByEmail,
    AddProfile,
    findAll,
    updateCustomerById,
    updateOneById,
    deleteOneById,
    findOneById,
    AddInsuranceToACustomer
};
