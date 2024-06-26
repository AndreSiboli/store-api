"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericError = exports.alredyExists = exports.notFoundError = exports.authorizationFailure = exports.badRequestError = void 0;
function badRequestError(res) {
    return res.status(400).json({
        message: `It was not possible to procced.`,
    });
}
exports.badRequestError = badRequestError;
function authorizationFailure(res) {
    return res.status(401).json({
        message: `Access Denied.`,
    });
}
exports.authorizationFailure = authorizationFailure;
function notFoundError(res, username) {
    return res.status(404).json({
        message: `The user ${username} was not found.`,
    });
}
exports.notFoundError = notFoundError;
function alredyExists(res, name) {
    return res.status(409).json({
        message: `This ${name} already exists.`,
    });
}
exports.alredyExists = alredyExists;
function genericError(res, err) {
    return res.status(500).json({
        message: `An error has occurred.`,
    });
}
exports.genericError = genericError;
