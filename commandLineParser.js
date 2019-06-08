"use strict";

const COMMAND_LINE_OPTION = {/* enroll what you want by using enrollOption */};
const INVAILD_OPTION_VALUE_INSERTED_MESSAGE = (option, value) => {
	return `There is unexpected command line option form.\n option :: ${option}\nvalue :: ${value}`;
};


const util = {};

util.isString = (input) => {
	return input instanceof String || typeof input === "string";
};


const commandLineOptionArray = Object.values(COMMAND_LINE_OPTION);

const isCommandLineOption = (couldBeOption) => {
	if(commandLineOptionArray.indexOf(couldBeOption) != -1) {
		return true;
	}
	return false;
};

/**
 * add new option for parsing it.
 * [key] : [value]
 * upperCase("option_accessor") : --"option_name" or 
 * upperCase("option_name") : --"option_name"
 *
 * @param {String} option_name
 * @param {String} option_accessor. optional.
 * @returns {bool} true if success and false or not
 */
const enrollOption = (option_name, option_accessor = null) => {
    const isValidOptionName = util.isString(option_name); 
    const isOptionAccessorString = util.isString(option_accessor);
    const isValidOptionAccessor = option_accessor === null ||
        isOptionAccessorString;
        
    if(!(isValidOptionName && isValidOptionAccessor))
    {
        return false;
    }
    
    // make key form like, string = --string
    let key;
    if(isOptionAccessorString) {
        key = option_accessor.toUpperCase();
    } else if(option_name.slice(0,2) == "--") {
        key = option_name.toUpperCase();
    } else {
        key = "--" + option_name.toUpperCase();
    }
    COMMAND_LINE_OPTION[key] = option_name;
    return true;
}


const parseOption = (inputArgv) => {
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


module.exports = { COMMAND_LINE_OPTION, parseOption, enrollOption };
