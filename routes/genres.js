const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    {id:1,value:'action'},
    {id:2,value:'horror'},
    {id:3,value:'fantasy'}
];

router.get('/',(req,res)=>{
    res.send(genres);
});
router.get('/:id',(req,res)=>{
    let genre = genres.find(c=>c.id===parseInt(req.params.id))
    res.send(genre?genre:`Genre with and id of ${req.params.id} doesn't exist.`);
});
router.post('/',(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);
    let genre = {
        id: genres[genres.length-1].id+1,
        value:req.body.value
    }
    genres.push(genre);
    res.send(genres);
});
router.put('/:id',(req,res)=>{    
    let genre = genres.find(c=>c.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre with and id of ${req.params.id} doesn't exist.`);

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);

    genre.value = req.body.value;
    res.send(genre);
})
router.delete('/:id',(req,res)=>{
    let genre = genres.find(c=>c.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre with and id of ${req.params.id} doesn't exist.`);
    let index = genres.indexOf(genre);
    return res.send(genres.splice(index,1));
})
function validate(data){
    const schema = Joi.object({
        value: Joi.string().min(3).required()
    })
    return schema.validate(data);
};

module.exports = router;