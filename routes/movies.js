const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Movies, validate} = require('../models/movie');
const {getGenreById} = require('../models/genres')

router.get('/',async(req,res)=>{
    try{
        const result = await Movies.find({}).lean();
        res.send(result);
    }
    catch(ex){
        console.error(ex.message);
        res.send(ex.message);
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const result = await Movies.findById(req.params.id).lean();
        res.send(result?result:'Couldn\'t find Movie with given id.');
    }
    catch(ex){
        console.error(ex.message);
        res.send(ex.message);
    }
});
router.post('/',async(req,res)=>{
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
        console.error(ex.message);
        res.send(ex.message);
    }
});
router.put('/:id',async(req,res)=>{
    try{

    }
    catch(ex){
        console.error(ex.message);
        res.send(ex.message);
    }
});
router.delete('/:id',async(req,res)=>{
    try{

    }
    catch(ex){
        console.error(ex.message);
        res.send(ex.message);
    }
});

module.exports = router;