const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
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
const Genres = new mongoose.model('Genre',genreSchema);

function validate(data){
    const schema = Joi.object({
        value: Joi.string().min(3).required()
    })
    return schema.validate(data);
};
function getGenreById(id){
    return new Promise((res,rej)=>{
        res(Genres.findById(id));
    })
};
module.exports.getGenreById = getGenreById;
module.exports.genreSchema = genreSchema;
module.exports.Genres = Genres;
module.exports.validate = validate;