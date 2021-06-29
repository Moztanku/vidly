const express = require('express');
const app = express();
const movies = require('./routes/movies')
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const main = require('./routes/main');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{useUnifiedTopology: true,useNewUrlParser: true})
    .then(  ()=>console.log('Connected to the DB...')    )
    .catch( err=>console.log('Couldn\'t connect to the DB: ',err.message)   );

app.use(express.json());

app.use('/',main);
app.use('/api/genres',genres);
app.use('/api/customers',customers)
app.use('/api/movies',movies);

const port = process.env.PORT || 3000;
app.listen(port,'localhost',()=>{
    console.log(`listening on port ${port}`);
});