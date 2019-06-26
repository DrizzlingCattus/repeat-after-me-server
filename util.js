
const util = {};

util.isString = (v) => {
    return v instanceof String || typeof v == "string";
};

util.isNotString = (v) => {
    return !util.isString(v);
};

/**
 * cut string from matching char to end
 *
 * @param {String} str target string
 * @param {Function} fromCond callback for finding starting index.
 * @returns {String} '' or String
 */
util.cutFrom = (str, fromCond = null) => {
    if(util.isNotString(str)) {
        throw Error('Invalid argument type, first argument need to String type, not ' + typeof str);
    } else if (fromCond === null) {
        throw Erro('Invalid argument, second argument need function, not null');
    }
    const strArr = Array.from(str);
    const start = strArr.findIndex(fromCond);
    return start === -1 ? '' : str.slice(start);
};

module.exports = util;
