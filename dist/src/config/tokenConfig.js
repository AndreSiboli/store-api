"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    secret_token: process.env.API_SECRET_TOKEN,
    secret_refresh_token: process.env.API_SECRET_REFRESH_TOKEN,
    expires_in_token: process.env.API_EXPIRES_TOKEN,
    expires_in_refresh_token: process.env.API_EXPIRES_REFRESH_TOKEN,
};
