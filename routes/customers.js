const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');
const auth = require('../middleware/auth');

router.get('/',async(req,res,next)=>{
    try{
        const result = await Customer.find({}).lean().sort({name:1});
        res.send(result);
    }
    catch(ex){
        next(ex);
    }
});
router.get('/:id',async(req,res,next)=>{
    try{
        const result = await Customer.findById(req.params.id);
        res.send(result?result.toObject():'Customer with a given id doesn\'t exist.');
    }
    catch(ex){
        next(ex);
    }
});
router.post('/',auth,async(req,res,next)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);
    try{
        const customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
        const result = await customer.save();
        res.send(result);
    }
    catch(ex){
        next(ex);
    }
});
router.put('/:id',auth,async(req,res,next)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);
    try{
        const result = await Customer.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        },{
            new: true,
            useFindAndModify: false
        });
        res.send(result?result.toObject():'Customer with a given id doesn\'t exist.');
    }
    catch(ex){
        next(ex);
    }
});
router.delete('/:id',auth,async(req,res,next)=>{
    try{
        const result = await Customer.findByIdAndDelete(req.params.id,{useFindAndModify: false});
        res.send(result?result.toObject():'Customer with a given id doesn\'t exist.');
    }
    catch(ex){
        next(ex);
    }
});

module.exports = router;