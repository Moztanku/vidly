const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    if(!process.env.JWT_PRIVATE_KEY){
        throw new Error('FATAL ERROR: JWT_PRIVATE_KEY not set in a .env file.');
    }
    mongoose.connect('mongodb://localhost/vidly',{useUnifiedTopology: true,useNewUrlParser: true})
    .then(()=>winston.info('Connected to the DB...'));
    mongoose.set('useCreateIndex',true);
};