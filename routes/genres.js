const express = require('express');
const router = express.Router();
const {Genres, validate} = require('../models/genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
var genresCount=0;

async function setGenresCount(){
    try{
        const result = await Genres.findOne({}).sort({id:-1}).select({id:1,_id:0}).lean();
        genresCount = result.id;
        if(!genresCount){
            genresCount = 0;
        }
        return;
    }
    catch(ex){
        genresCount = 0;
        return;
    }
};

router.get('/',asyncMiddleware(async (req,res)=>{
    let genres = await Genres.find({}).lean();
    res.send(genres);
}));
router.get('/:id',asyncMiddleware(async (req,res,next)=>{
        let result = await Genres.findOne({id:Number.parseInt(req.params.id)}).lean();
        if(!result)
            return res.status(404).send('Genre with a given id doesn\'t exist.');
        res.send(result);
}));
router.post('/',auth,async(req,res,next)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);
    try{
        await setGenresCount();
        let genre = new Genres({
            id: ++genresCount,
            value: req.body.value
        });
        let result = await genre.save();
        res.send(result.toObject());
    }
    catch(ex){
        next(ex);
    }
});
router.put('/:id',auth,async(req,res,next)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);
    try{
        let result = await Genres.findOneAndUpdate({id:Number.parseInt(req.params.id)},{value:req.body.value},{useFindAndModify: false,new:true});
        if(result){
            res.send(result)
        }
        else{
            res.status(404).send('Genre with a given id doesn\'t exist.')
        }
    }
    catch(ex){
        next(ex);
    }
});
router.delete('/:id',[auth,admin],async(req,res,next)=>{
    try{
        let result = await Genres.findOneAndDelete({id:Number.parseInt(req.params.id)},{useFindAndModify: false});
        if(result){
            res.send(result);
        }
        else{
            res.status(404).send('Genre with a given id doesn\'t exist.');
        }
    }
    catch(ex){
        next(ex);
    }
});

module.exports = router;