const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');

router.get('/',async(req,res)=>{
    try{
        const result = await Customer.find({}).lean().sort({name:1});
        res.send(result);
    }
    catch(ex){
        console.log(ex.message);
        res.send(ex.message);
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const result = await Customer.findById(req.params.id);
        res.send(result?result.toObject():'Customer with a given id doesn\'t exist.');
    }
    catch(ex){
        console.log(ex.message);
        res.send(ex.message);
    }
});
router.post('/',async(req,res)=>{
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
        console.log(ex.message);
        res.send(ex.message);
    }
});
router.put('/:id',async(req,res)=>{
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
        console.log(ex.message);
        res.send(ex.message);
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const result = await Customer.findByIdAndDelete(req.params.id,{useFindAndModify: false});
        res.send(result?result.toObject():'Customer with a given id doesn\'t exist.');
    }
    catch(ex){
        console.log(ex.message);
        res.send(ex.message);
    }
});

module.exports = router;