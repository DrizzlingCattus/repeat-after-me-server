const mongoose = require('mongoose');

const { CONFIG } = require('./config.js');

const SCHEMA_TYPE = {
    SIMPLE: 'simple',
    LOGIN: 'login'
};

const connect_url = `mongodb://${CONFIG.DB_SERVER_IP}:${CONFIG.DB_PORT}/${CONFIG.DB_NAME}`;
mongoose.connect(connect_url, {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('connect db successfully!');
});

const makeSimpleSchema = (name) => {
    return new mongoose.Schema({
        date: String,
        quiz: String,
        answer: String,
        hints: {
            type: [String],
            default: undefined
        }
    }, {
        collection: name 
    });
};

const makeLoginSchema = (name) => {
    return new mongoose.Schema({
        user_id: String,
        user_password: String
    }, {
        collection: name
    });
};

const getSchema = (type, name) => {
    if (SCHEMA_TYPE.SIMPLE === type) {
        return makeSimpleSchema(name);
    } else if (SCHEMA_TYPE.LOGIN === type) {
        return makeLoginSchema(name);
    }
    return null;
}

const getCollection = (type, name) => {
    const schema = getSchema(type, name);
    return new mongoose.model(name, schema);
};

module.exports = {
    SCHEMA_TYPE,
    getCollection
}
