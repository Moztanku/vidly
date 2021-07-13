const express = require('express');
const router = express.Router();
const {Genres, validate} = require('../models/genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');

async function getGenresCount(){
    try{
        const result = await Genres.findOne({}).sort({id:-1}).select({id:1,_id:0}).lean();
        return result.id;
    }
    catch(ex){
        return 0;
    }
};
getGenresCount().then(res=>genresCount=res);

router.get('/',asyncMiddleware(async (req,res)=>{
    let genres = await Genres.find({}).lean();
    res.send(genres);
}));
router.get('/:id',asyncMiddleware(async (req,res,next)=>{
        let result = await Genres.findOne({id:Number.parseInt(req.params.id)}).lean();
        res.send(result?result:'Genre with a given id doesn\'t exist.');
}));
router.post('/',auth,async(req,res,next)=>{
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
        next(ex);
    }
});
router.put('/:id',auth,async(req,res,next)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);
    try{
        let result = await Genres.findOneAndUpdate({id:Number.parseInt(req.params.id)},{value:req.body.value},{useFindAndModify: false});
        res.send(result?result.toObject():'Genre with a given id doesn\'t exist.');
    }
    catch(ex){
        next(ex);
    }
});
router.delete('/:id',[auth,admin],async(req,res,next)=>{
    try{
        let result = await Genres.findOneAndDelete({id:Number.parseInt(req.params.id)},{useFindAndModify: false});
        res.send(result?result.toObject():'Genre with a given id doesn\'t exist.');
    }
    catch(ex){
        next(ex);
    }
});

module.exports = router;