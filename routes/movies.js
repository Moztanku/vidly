const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Movies, validate} = require('../models/movie');
const {getGenreById} = require('../models/genres')
const auth = require('../middleware/auth');

router.get('/',async(req,res,next)=>{
    try{
        const result = await Movies.find({}).lean();
        res.send(result);
    }
    catch(ex){
        next(ex);
    }
});
router.get('/:id',async(req,res,next)=>{
    try{
        const result = await Movies.findById(req.params.id).lean();
        res.send(result?result:'Couldn\'t find Movie with given id.');
    }
    catch(ex){
        next(ex);
    }
});
router.post('/',auth,async(req,res,next)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);
    try{
        const genre = await getGenreById(req.body.genreId);
        const movie = Movies({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
        const result = await movie.save();
        res.send(result.toObject());
    }
    catch(ex){
        next(ex);
    }
});
router.put('/:id',auth,async(req,res,next)=>{
    try{

    }
    catch(ex){
        next(ex);
    }
});
router.delete('/:id',auth,async(req,res,next)=>{
    try{

    }
    catch(ex){
        next(ex);
    }
});

module.exports = router;