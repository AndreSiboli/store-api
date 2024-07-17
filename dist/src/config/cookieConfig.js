"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    cookieAgeToken: parseInt(process.env.API_COOKIE_AGE_TOKEN),
    cookieAgeRefreshToken: parseInt(process.env.API_COOKIE_AGE_REFRESH_TOKEN),
    cookieSameSite: process.env.API_COOKIE_SAME_SITE,
};
