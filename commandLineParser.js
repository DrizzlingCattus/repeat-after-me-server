const util = require('./util.js');

const COMMAND_LINE_OPTION = {};
const INVAILD_OPTION_VALUE_INSERTED_MESSAGE = (option, value) => {
    return `There is unexpected command line option form.\n option :: ${option}\nvalue :: ${value}`;
};

const optionNameList = []; 
const isCommandLineOption = (couldBeOption) => {
    if(optionNameList.indexOf(couldBeOption) != -1) {
        return true;
    }
    return false;
};

/**
 * add new option for parsing it.
 * [key] : [value]
 * upperCase("optionAccessor") : --"optionName" or 
 * upperCase("optionName") : --"optionName"
 *
 * @param {String} optionName like --option-name
 * @param {String} optionAccessor like OPTION_ACCESSOR. 
 * optional.
 * @returns {bool} true if success and false or not
 */
const enrollOption = (optionName, optionAccessor = null) => {
    const isValidOptionName = util.isString(optionName); 
    const isOptionAccessorString = util.isString(optionAccessor);
    const isValidOptionAccessor = optionAccessor === null ||
        isOptionAccessorString;

    if(!(isValidOptionName && isValidOptionAccessor))
    {
        return false;
    }

    // make key form like KEY_NAME
    let key;
    if(isOptionAccessorString) {
        key = optionAccessor.toUpperCase().replace(/-/g, '_');
    } else {
        // '--' + 'something-left' => use something-left
        key = util.cutFrom(optionName, (v) => v != '-');
        if(key.length === 0) {
            throw Error('optionName is not vaild for accessor. you must include just one more alpha letter');
        }
        key = key.toUpperCase().replace(/-/g, '_');
    }
    COMMAND_LINE_OPTION[key] = optionName;
    optionNameList.push(optionName);
    return true;
};

const parseNodeArgv = (inputArgv) => {
    const insertedCLOption = {};
    const argv = inputArgv.copyWithin();

    while(argv.length != 0) {
        const couldBeOption = argv.shift();
        if(isCommandLineOption(couldBeOption)) {
            const value = argv[0];
            if(isCommandLineOption(value) || value === undefined || value.length == 0) {
                throw new Error(INVAILD_OPTION_VALUE_INSERTED_MESSAGE(couldBeOption, value));
            }
            insertedCLOption[couldBeOption] = value;
            // pop out, it already save in insertedCLOption
            argv.shift();
        }
    }
    return insertedCLOption;
};


module.exports = { COMMAND_LINE_OPTION, parseNodeArgv, enrollOption };
