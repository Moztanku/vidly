const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genres');

const Movies = new mongoose.model('Movie',{
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

function validate(data){
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    })
    return schema.validate(data);
};

module.exports.Movies = Movies;
module.exports.validate = validate;