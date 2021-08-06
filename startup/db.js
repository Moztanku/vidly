const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
    if(!process.env.JWT_PRIVATE_KEY){
        throw new Error('FATAL ERROR: JWT_PRIVATE_KEY not set in a .env file.');
    }
    mongoose.connect(config.get('db'),{useUnifiedTopology: true,useNewUrlParser: true})
    .then(()=>winston.info(`Connected to ${config.get('db')}...`));
    mongoose.set('useCreateIndex',true);
};