const Joi = require('joi');
const mongoose = require('mongoose');

const Genres = new mongoose.model('Genre',{
    id:{
        type: Number,
        required: true
    },
    value:{
        type: String,
        minlength: 3,
        maxlength: 12,
        required: true
    }
});

function validate(data){
    const schema = Joi.object({
        value: Joi.string().min(3).required()
    })
    return schema.validate(data);
};

module.exports.Genres = Genres;
module.exports.validate = validate;