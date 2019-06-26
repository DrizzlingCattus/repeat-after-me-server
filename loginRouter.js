
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { JWT_CONFIG } = require('./jwtConfig.js');
const { makeRestful } = require('./restfulInterface.js');
const { SCHEMA_TYPE, getCollection } = require('./db.js');
const util = require('./util.js');


const routerPacking = makeRestful(router);
const self = routerPacking;

self.init = (collectionName) => {
    const collection = getCollection(SCHEMA_TYPE.LOGIN, collectionName);
    self.collection = collection;

    self.prefix = '';
};

self.attach = (prefix, server) => {
    self.prefix = prefix;
    // express specific api
    // router is express object, usr is express app.use
    server.use(prefix, router);
};

/* Get login JWT when user is verified */
self.post('/login').then((req, res) => {
    const queryInfo = {
        user_id: req.body.userId
    };

    self.collection.findOne(queryInfo).then((userInfo) => {
        if(userInfo.user_password == req.body.userPassword) {
            // JWT send
            let token = jwt.sign({
                user_id: queryInfo.user_id
            },
                JWT_CONFIG.SECRET_KEY,
                {
                    expiresIn: '1h'
                }
            );
            res.cookie('ram_user', token);
            res.type('application/json');
            res.status(200);
            res.json({
                status: 'success',
                token: token
            });
        }else {
            res.status(404);
            res.json({
                message: 'user verification fail',
                status: 'fail'
            });
        }
    }).catch((err) => {
        res.status(404);
        res.json({
            message: 'Error ocurr, system problem',
            status: 'fail'
        });
    });
});

self.get('/login/auth').then((req, res) => {
    const authString = req.get('Authorization');
    const token = util.isString(authString) ? authString.split(' ')[1] : '';
    
    if(token == '') {
        // client error : 401 Unauthorized
        res.status(401);
        res.json({
            status: 'fail'
        });
    }else {
        const decoded = jwt.verify(token, JWT_CONFIG.SECRET_KEY); 
        const queryInfo = {
            user_id: decoded.user_id
        };
        self.collection.findOne(queryInfo).then((userInfo) => {
            res.status(200);
            res.json({
                status: 'success'
            });
        }).catch((err) => {
            res.status(401);
            res.json({
                status: 'fail'
            });
        });
    }
});
    

module.exports = routerPacking;
