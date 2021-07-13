
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Fawn = require('fawn');
const _ = require('lodash');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const {User} = require('../models/user');

// Login
router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');

    const result = await bcrypt.compare(req.body.password, user.password);
    if(!result) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(data){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(data);
};

module.exports = router;