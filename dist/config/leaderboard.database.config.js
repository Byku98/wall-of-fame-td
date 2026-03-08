"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
exports.pool = promise_1.default.createPool({
    host: "localhost",
    port: 3306,
    user: "srv90802_pszczolki-admin",
    password: "rj89W8uxes7u4NHr35rL",
    database: "srv90802_pszczolki-waf-local",
    waitForConnections: true,
    connectionLimit: 10,
    // host: "192.168.1.125",
    // port: 30306, 
    // user: "leaderboard_user",
    // password: "leaderboard_user",
    // database: "pszczolki-wof-local",
    // waitForConnections: true,
    // connectionLimit: 10,
});
//# sourceMappingURL=leaderboard.database.config.js.map