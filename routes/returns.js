const express = require('express');
const router = express.Router();
const {Rental} = require('../models/rental');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


router.post('/',[auth,validate(validateReturn)],async (req,res)=>{
    const rental = await Rental.lookup(req.body.customerId,req.body.movieId);
    if(!rental) return res.status(404).send('Rental not found.');

    res.status(200).send(rental);
});

function validateReturn(req){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(req);
};
module.exports = router;