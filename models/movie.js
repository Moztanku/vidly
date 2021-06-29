const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = require('./genres');

const movieSchema = new mongoose.Schema({
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

const Movies = new mongoose.model('Movie',movieSchema);

function validate(data){
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    })
    return schema.validate(data);
};
function getMovieById(id){
    return new Promise((res,rej)=>{
        res(Movies.findById(id));
    })
};
module.exports.Movies = Movies;
module.exports.validate = validate;
module.exports.movieSchema = movieSchema;
module.exports.getMovieById = getMovieById;