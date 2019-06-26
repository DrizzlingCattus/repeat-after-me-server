const clo = require('./commandLineParser.js');

clo.enrollOption("--server-ip", "SERVER_IP");
clo.enrollOption("--server-port", "SERVER_PORT");
clo.enrollOption("--db-server-url", "DB_SERVER_URL");
clo.enrollOption("--db-server-ip", "DB_SERVER_IP");
clo.enrollOption("--db-port", "DB_PORT");
clo.enrollOption("--db-name", "DB_NAME");

const COMMAND_LINE_OPTION = clo.COMMAND_LINE_OPTION;

const CONFIG = {};
const initConfig = (options) => {
    const optionValues = clo.parseNodeArgv(options);
    CONFIG.SERVER_IP = optionValues[COMMAND_LINE_OPTION.SERVER_IP];
    CONFIG.SERVER_PORT = optionValues[COMMAND_LINE_OPTION.SERVER_PORT];
    CONFIG.DB_SERVER_URL = optionValues[COMMAND_LINE_OPTION.DB_SERVER_URL];
    CONFIG.DB_SERVER_IP = optionValues[COMMAND_LINE_OPTION.DB_SERVER_IP];
    CONFIG.DB_PORT = optionValues[COMMAND_LINE_OPTION.DB_PORT];
    CONFIG.DB_NAME = optionValues[COMMAND_LINE_OPTION.DB_NAME];
}

    
module.exports = { CONFIG, initConfig };
