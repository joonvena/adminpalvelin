const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InsuranceApplicationSchema = new Schema({
    insurancetype: {
        type: String,
        required: [true]
    },
    userid: {
        type: String,
        required: [true]
    },
    age: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    year: {
        type: Number
    },
    valid: {
        type: String
    },
    expires: {
        type: String
    },
    deductible: {
        type: Number
    },
    objectOfInsurance: {
        type: Object
    },
    notification: {
        type: Object
    },
    additionalinfo: {
        type: String
    }
}, {collection: 'insuranceapplications'});

const InsuranceApplication = mongoose.model('insuranceapplications', InsuranceApplicationSchema);

module.exports = InsuranceApplication;