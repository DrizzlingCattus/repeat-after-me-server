
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const dbServerIP = '45.76.203.189';
const dbPort = 27019;
const dbName = 'repeat-after-me';
mongoose.connect(
    `mongodb://${dbServerIP}:${dbPort}/${dbName}`, 
    {
        useNewUrlParser: true
    }
);

const simpleRepeatSchema = new mongoose.Schema({
    date: String,
    quiz: String,
    answer: String,
    hints: {
        type: [String],
        default: undefined
    }
}, {
    collection: 'testsimple'
});

simpleRepeatSchema.methods.alert = function() { 
    const mesg = this.date + ' // ' +
        this.quiz + ' // ' +
        this.answer + ' // ' +
        this.hints + '\n';
    console.log(mesg);
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connect db, success!');
    const Test = new mongoose.model('test', simpleRepeatSchema);
    Test.find().then(function(err, doc) {
        console.log(err);
        console.log(doc);
    });
//
//    const simpleOne = new Test({
//        date: '2019-06-05', 
//        quiz: 'test quiz 1', 
//        answer: 'test answer 1', 
//        hints: ['quiz 1', 'answer 1', 'common 1']
//    });
//    const simpleTwo = new Test({
//        date: '2019-06-06', 
//        quiz: 'test quiz 2', 
//        answer: 'test answer 2', 
//        hints: ['quiz 2', 'answer 2', 'common 1']
//    });
//    const simpleThree = new Test({
//        date: '2019-06-07', 
//        quiz: 'test quiz 3', 
//        answer: 'test answer 3', 
//        hints: ['quiz 3', 'answer 3', 'common 2']
//    });
//
//
//    simpleOne.save();
//    simpleTwo.save();
//    simpleThree.save();
});

//router.use((req, res, next) => {
//    console.log("rounter use calling");
//    next();
//});
//
//const server = express();
//server.use('/repeat-after-me', router);
//const makeRestful = (server) => {
//
//    return {
//        get: (path, callback) => {
//            server.get(path, callback);
//        },
//
//        put: (path, callback) => {
//            server.put(path, callback);
//        }
//    };
//};
//const restfulServer = makeRestful(server);
//
//restfulServer.get('/simple',
