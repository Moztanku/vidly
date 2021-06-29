const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');

const {Rental, validate} = require('../models/rental');
const {getCustomerById} = require('../models/customer');
const {getMovieById} = require('../models/movie');

Fawn.init(mongoose);

router.get('/',async(req,res)=>{
    try{
        const result = await Rental.find({}).lean();
        res.send(result);
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
        const customer = await getCustomerById(req.body.customerId);
        const movie = await getMovieById(req.body.movieId);
        const rental = Rental({
            customer: {
                _id: customer._id,
                name: customer.name
            },
            movie: {
                _id: movie._id,
                title: movie.title
            },
            date: req.body.date?new Date(req.body.date):Date.now()
        });
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies',{_id: movie._id},{
                $inc: {numberInStock: -1}
            })
            .run();

        res.send(rental.toObject());
    }
    catch(ex){
        console.error(ex.message);
        res.send(ex.message);
    }
});

module.exports = router;