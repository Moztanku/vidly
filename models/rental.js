const Joi = require('joi');
const mongoose = require('mongoose');


const Rental = mongoose.model('Rental',new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minLength: 3,
                maxLength: 12,
                match: /^[A-Z].*/,
                required: true
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
           title: {
                type: String,
                required: true,
                trim: true,
                minlength: 2,
                maxlength: 255
            },
        }),
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
}));

function validate(data){
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required(),
        data: Joi.date()
    });
    return schema.validate(data);
}

module.exports.Rental = Rental;
module.exports.validate = validate;