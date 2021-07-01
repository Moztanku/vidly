const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Fawn = require('fawn');
const _ = require('lodash');

const {User,validate} = require('../models/user');

// List all users
router.get('/',async(req,res)=>{

});

// Add new user
router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('USer already registered.');

    user = new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);

    await user.save();
    res.send(_.pick(user, ['name','email']));
});

module.exports = router;