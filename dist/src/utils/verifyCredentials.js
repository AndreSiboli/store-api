"use strict";
// export function checkName(value: string) {
//   const regex = /[\p{L} ]/gu;
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.checkEmail = exports.checkUsername = void 0;
//   if (!value || value.length < 2) return false;
//   if (value.match(regex)?.length !== value.length) return false;
//   return true;
// }
function checkUsername(value) {
    if (!value || value.length < 2)
        return false;
    return true;
}
exports.checkUsername = checkUsername;
function checkEmail(value) {
    var _a, _b, _c;
    const regex = /[a-z0-9.]/gi;
    if (!value)
        return false;
    if (((_a = value.match(/@/g)) === null || _a === void 0 ? void 0 : _a.length) !== 1)
        return false;
    const [root, domain] = value.split("@");
    //Checking the root
    if (((_b = root.match(regex)) === null || _b === void 0 ? void 0 : _b.length) !== root.length)
        return false;
    if (root.startsWith(".") || root.endsWith("."))
        return false;
    const regexDots = /\.{2,}/;
    if (regexDots.test(root))
        return false;
    //Checking domain
    if (((_c = domain.match(/[.]/g)) === null || _c === void 0 ? void 0 : _c.length) !== 1)
        return false;
    const [initial, com] = domain.split(".");
    if (!initial)
        return false;
    if (!com.endsWith("com"))
        return false;
    return true;
}
exports.checkEmail = checkEmail;
function checkPassword(value, reValue) {
    const upper = /[A-Z]/.test(value);
    const lower = /[a-z]/.test(value);
    const number = /[0-9]/.test(value);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const length = value.length >= 8 ? true : false;
    const equal = value === reValue;
    if (upper && lower && number && special && equal && length)
        return true;
    return false;
}
exports.checkPassword = checkPassword;
