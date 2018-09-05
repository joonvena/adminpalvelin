const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    insurancetype: {
        type: String,
        required: [true]
    },
    userid: {
        type: String
    },
    duedate: {
        type: String
    },
    referenceNumber: {
        type: String
    },
    accountnumber: {
        type: Number
    }
}, {collection: 'invoices'});


const Invoice = mongoose.model('invoices', InvoiceSchema);


module.exports = Invoice;