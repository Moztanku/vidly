const express = require('express');
const users = require('../routes/users');
const rentals = require('../routes/rentals');
const movies = require('../routes/movies')
const customers = require('../routes/customers');
const genres = require('../routes/genres');
const auth = require('../routes/auth');
const main = require('../routes/main');
const error = require('../middleware/error');

module.exports = function(app){
    app.use('/',main);
    app.use('/api/genres',genres);
    app.use('/api/customers',customers)
    app.use('/api/movies',movies);
    app.use('/api/rentals',rentals);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
    app.use(error);
};