const express = require('express');
const router = express.Router();
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

async function getGenresCount(){
    const result = await Genres.findOne({}).sort({id:-1}).select({id:1,_id:0}).lean();
    return result.id;
};
getGenresCount().then(res=>genresCount=res);

router.get('/',async (req,res)=>{
    try{
        let genres = await Genres.find({}).lean();
        res.send(genres);
    }
    catch(ex){
        console.log(ex.message);
    }
});
router.get('/:id',async (req,res)=>{
    try{    
        let result = await Genres.findOne({id:Number.parseInt(req.params.id)}).lean();
        res.send(result?result:'Genre with a given id doesn\'t exist.');
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
        let genre = new Genres({
            id: ++genresCount,
            value: req.body.value
        });
        let result = await genre.save();
        res.send(result.toObject());
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
        let result = await Genres.findOneAndUpdate({id:Number.parseInt(req.params.id)},{value:req.body.value},{useFindAndModify: false});
        res.send(result?result.toObject():'Genre with a given id doesn\'t exist.');
    }
    catch(ex){
        console.log(ex.message);
        res.send(ex.message);
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        let result = await Genres.findOneAndDelete({id:Number.parseInt(req.params.id)},{useFindAndModify: false});
        res.send(result?result.toObject():'Genre with a given id doesn\'t exist.');
    }
    catch(ex){
        console.log(ex.message);
        res.send(ex.message);
    }
})
function validate(data){
    const schema = Joi.object({
        value: Joi.string().min(3).required()
    })
    return schema.validate(data);
};

module.exports = router;