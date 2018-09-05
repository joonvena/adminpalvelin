const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InsuranceClaimSchema = new Schema({
    text: {
        type: String,
        required: [true]
    },
    userid: {
        type: String,
        required: [true]
    },
    handled: {
        type: String,
        default: "Käsittelyssä"
    },
    email: {
        type: String,
        required: [true]
    },
    date: {
        type: Date,
        default: Date.now
    }

}, {collection: 'insuranceclaims'});


const InsuranceClaim = mongoose.model('insuranceclaims', InsuranceClaimSchema);


module.exports = InsuranceClaim;