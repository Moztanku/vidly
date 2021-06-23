const express = require('express');
const app = express();
const genres = require('./routes/genres');
const main = require('./routes/main');

app.use(express.json());

app.use('/',main);
app.use('/api/genres',genres);

const port = process.env.PORT || 3000;
app.listen(port,'localhost',()=>{
    console.log(`listening on port ${port}`);
});