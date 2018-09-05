const Insurance = require('../models/Insurance');
const profileDBService = require('./profileAdminDBservice');

function findOneById(req, res) {
    Insurance.findById({_id: req.params.id}).then(insurance => res.json(insurance))
}

function findAllByUserID(req, res) {
    Insurance.find({userid: req.params.id})
        .then((insurance) => {
            res.json(insurance)
        })
}

function deleteCustomerInsurance(id) {
    let insuranceid = id;
    console.log('insuranceid')
    console.log(insuranceid);
    Insurance.deleteOne({_id: insuranceid}).then(res => {
        console.log('deleted');
    });
}

function findAll() {
    return Insurance.find({}, (err, insurances) => {
        if (err) throw err;
        else return insurances;
    });
}

function addOne(data) {
    return Insurance.create(data)
        .then(createdInsurance => {
        })
        .catch(error => {
        });
}

function updateOneById(data) {
    return Insurance.findByIdAndUpdate({_id: data._id}, data, (err, insurance) => {
        return data;
    });
}

function createInsuranceAndUpdateCustomer(req, res, id) {
    let applicationId = id;
    Insurance.create(req.body).then(document => {
        profileDBService.updateProfileInsurances(document._id, document.userid, applicationId)
    })

}

function deleteOneById(id) {
    Insurance.deleteOne({_id: id}, (err, result) => {
    });
}

module.exports = {
    findOneById,
    createInsuranceAndUpdateCustomer,
    findAllByUserID,
    deleteCustomerInsurance,
    findAll,
    addOne,
    updateOneById,
    deleteOneById
};

