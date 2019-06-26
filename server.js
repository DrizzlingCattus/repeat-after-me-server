
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { CONFIG, initConfig } = require('./config.js');
// Need to init config as soon as possible
// cuz below module load config and use it
initConfig(process.argv);
const { makeRestful } = require('./restfulInterface.js');
const simpleRouter = require('./simpleRouter.js');
const loginRouter = require('./loginRouter.js');

//TODO: load complexRouter 

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

// enable CORS
server.use(cors());


const APP_PREFIX_PATH = '/api/repeat-after-me';
const SIMPLE_ROUTER_COLLECTION_NAME = 'simple';
simpleRouter.init(SIMPLE_ROUTER_COLLECTION_NAME);
simpleRouter.attach(APP_PREFIX_PATH + '/' + SIMPLE_ROUTER_COLLECTION_NAME, server);

const LOGIN_ROUTER_COLLECTION_NAME = 'login';
loginRouter.init(LOGIN_ROUTER_COLLECTION_NAME);
loginRouter.attach(`${APP_PREFIX_PATH}`, server);


const serverInstance = server.listen(CONFIG.SERVER_PORT, CONFIG.SERVER_IP);


// if error occur -> log and need to close server and restart?
