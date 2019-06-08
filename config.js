const clo = require('./commandLineParser.js');
const COMMAND_LINE_OPTION = clo.COMMAND_LINE_OPTION;

clo.enrollOption("--server-ip", "SERVER_IP");
clo.enrollOption("--server-port", "SERVER_PORT");
clo.enrollOption("--db-server-url", "DB_SERVER_URL");
clo.enrollOption("--db-server-ip", "DB_SERVER_IP");
clo.enrollOption("--db-port", "DB_PORT");
clo.enrollOption("--db-name", "DB_NAME");

const optionValues = clo.parseOption(process.argv);

const CONFIG = {
    SERVER_IP: optionValues[COMMAND_LINE_OPTION.SERVER_IP],
    SERVER_PORT: optionValues[COMMAND_LINE_OPTION.SERVER_PORT],
    DB_SERVER_URL: optionValues[COMMAND_LINE_OPTION.DB_SERVER_URL],
    DB_SERVER_IP: optionValues[COMMAND_LINE_OPTION.DB_SERVER_IP],
    DB_PORT: optionValues[COMMAND_LINE_OPTION.DB_PORT],
    DB_NAME: optionValues[COMMAND_LINE_OPTION.DB_NAME]
};

    
module.exports = { CONFIG };
