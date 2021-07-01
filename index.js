require('dotenv').config();
const express = require('express');
const app = express();
const users = require('./routes/users');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies')
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const auth = require('./routes/auth');
const main = require('./routes/main');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{useUnifiedTopology: true,useNewUrlParser: true})
    .then(  ()=>console.log('Connected to the DB...')    )
    .catch( err=>console.log('Couldn\'t connect to the DB: ',err.message)   );
mongoose.set('useCreateIndex',true);
app.use(express.json());

app.use('/',main);
app.use('/api/genres',genres);
app.use('/api/customers',customers)
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port,'localhost',()=>{
    console.log(`listening on port ${port}`);
});