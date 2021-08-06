require('dotenv').config();
const express = require('express');
const app = express();
const winston = require('winston');

app.use(express.json());
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3001;
const server = app.listen(port,'localhost',()=>{
    winston.info(`listening on port ${port}`);
});
module.exports = server;