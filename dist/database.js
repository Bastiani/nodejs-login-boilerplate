"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var mongoose_1 = __importDefault(require("mongoose"));
function connectDatabase() {
    return new Promise(function (resolve, reject) {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connection
            .on('error', function (error) { return reject(error); })
            .on('close', function () { return console.log('Database connection closed.'); })
            .once('open', function () { return resolve(mongoose_1.default.connections[0]); });
        mongoose_1.default.connect('mongodb://localhost/nodejs-login-boilerplate');
    });
}
exports.default = connectDatabase;
