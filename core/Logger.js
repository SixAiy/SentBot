const chalk = require("chalk");
const moment = require("moment");
const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;

exports.log = (content, type = "log") => {
    switch (type) {
        case "log": {
            return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
        }
        case "warn": {
            return console.log(`${timestamp} ${chalk.bgYellow(type.toUpperCase())} ${content} `);
        }
        case "error": {
            return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
        }
        case "debug": {
            return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
        }
        case "ready": {
            return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
        }
        default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
    }
};

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");