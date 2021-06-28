const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('customer',new mongoose.Schema({
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
}));

function validate(data){
    const schema = Joi.object({
        name: Joi.string().min(3).max(12).regex(/^[A-Z].*/),
        phone: Joi.string().length(9).regex(/^\d\d\d\d\d\d\d\d\d/),
        isGold: Joi.boolean()
    });
    return schema.validate(data);
};

module.exports.Customer = Customer;
module.exports.validate = validate;