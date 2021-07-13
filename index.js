require('dotenv').config();
const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port,'localhost',()=>{
    winston.info(`listening on port ${port}`);
});