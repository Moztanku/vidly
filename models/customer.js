const Joi = require('joi');
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 12,
        match: /^[A-Z].*/,
        required: true
    },
    phone: {
        type: String,
        minLength: 9,
        maxLength: 9,
        match: /^\d\d\d\d\d\d\d\d\d/
    },
    isGold: {
        type: Boolean,
        default: false
    }
});
const Customer = mongoose.model('customer',customerSchema);

function validate(data){
    const schema = Joi.object({
        name: Joi.string().min(3).max(12).regex(/^[A-Z].*/),
        phone: Joi.string().length(9).regex(/^\d\d\d\d\d\d\d\d\d/),
        isGold: Joi.boolean()
    });
    return schema.validate(data);
};
function getCustomerById(id){
    return new Promise((res,rej)=>{
        res(Customer.findById(id));
    })
};

module.exports.Customer = Customer;
module.exports.validate = validate;
module.exports.customerSchema = customerSchema;
module.exports.getCustomerById = getCustomerById;