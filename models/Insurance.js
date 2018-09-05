const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InsuranceSchema = new Schema({
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
    valid: {
        type: String
    },
    nextPaymentDate: {
        type: String

    },
    expires: {
        type: String
    },
    priceperyear: {
        type: Number
    },
    deductible: {
        type: Number
    },
    additionalinfo: {
        type: String
    },
    objectOfInsurance: {
        type: Object
    },
    notification: {
        type: Object
    }
}, {collection: 'insurances'});


const Insurance = mongoose.model('insurances', InsuranceSchema);


module.exports = Insurance;