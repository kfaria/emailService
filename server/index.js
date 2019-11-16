const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes');
const server = express();
const expressValidator = require('express-validator')


server.use(express.json());
server.use(bodyParser.json());
server.use(expressValidator());
server.use('', routes);

module.exports = server;