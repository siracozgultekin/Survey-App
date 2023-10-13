"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "sas"
});
exports.default = pool;
