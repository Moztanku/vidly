const Joi = require('joi');
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
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
});
rentalSchema.statics.lookup = function(customerId,movieId){
    return this.findOne({
        'customer._id':customerId,
        'movie._id':movieId
    }).lean();
};
const Rental = mongoose.model('Rental',rentalSchema);

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