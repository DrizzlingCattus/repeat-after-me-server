
const express = require('express');
const bodyParser = require('body-parser');

const { CONFIG } = require('./config.js');
// 1. CONFIG가 설정이 잘 안된다.(process.argv문제)
// 2. PORT가 string이라서 문제. number이어야하는듯?
CONFIG.SERVER_IP = '139.180.202.142';
CONFIG.SERVER_PORT = '8080';
CONFIG.DB_SERVER_URL = 'lib.stenrine.com';
CONFIG.DB_SERVER_IP = '45.76.203.189';
CONFIG.DB_PORT = '27019';
CONFIG.DB_NAME = 'repeat-after-me';
const { makeRestful } = require('./restfulInterface.js');
const simpleRouter = require('./simpleRouter.js');

// load complexRouter 

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

const APP_PREFIX_PATH = '/repeat-after-me';
const SIMPLE_ROUTER_COLLECTION_NAME = 'simple';
simpleRouter.init(SIMPLE_ROUTER_COLLECTION_NAME);
simpleRouter.attach(APP_PREFIX_PATH + '/' + SIMPLE_ROUTER_COLLECTION_NAME, server);


const serverInstance = server.listen(CONFIG.SERVER_PORT, CONFIG.SERVER_IP);


// if error occur -> log and need to close server and restart?
