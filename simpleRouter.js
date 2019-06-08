
const express = require('express');
const router = express.Router();

const { makeRestful } = require('./restfulInterface.js');
const { SCHEMA_TYPE, getCollection }= require('./db.js');


const routerPacking = makeRestful(router);
const self = routerPacking;

self.init = (collectionName) => {
    const collection = getCollection(SCHEMA_TYPE.SIMPLE, collectionName);
    self.collection = collection;

    self.prefix = '';
};

self.attach = (prefix, server) => {
    self.prefix = prefix;
    server.use(prefix, router);
};

/* Get all quiz document */
self.get('/quizs').then(({req, res}) => {
    self.collection.find().then((result) => {
        res.send(result);
    });
}).catch((err) => {
    console.log(self.prefix + '/quizs throw error => '+ err);
});

/* Get quiz from DB from id */
self.get('/quizs/:id').then(({req, res}) => {
    const quizId = req.params.id;
    self.collection.findOne({'_id': quizId}).then((result) => {
        res.send(result);
    });
}).catch((err) => {
    console.log(self.prefix + '/quizs/:id throw error => ' + err);
});

/* Get quizs from DB with date */
self.get('/quizs/date/:date').then(({req, res}) => {
    const quizDate = req.params.date;
    self.collection.find({'date': quizDate}).then((result) => {
        res.send(result);
    });
}).catch((err) => {
    console.log(self.prefix + '/quizs/date/:date throw error => ' + err);
});

/* Get quizs from DB with date ~ date */
self.get('/quizs/date/:start/:end').then(({req, res}) => {
    const dateStart = req.params.start;
    const dateEnd = req.params.end;
    self.collection.find({
        'date': {
            $gte: dateStart,
            $lte: dateEnd
        }
    }).then((result) => {
        res.send(result);
    });
}).catch((err) => {
    console.log(self.prefix + '/quizs/date/:date throw error => ' + err);
});


module.exports = routerPacking;
