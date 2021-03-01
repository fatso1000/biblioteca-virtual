"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    signup: joi_1.default.object().keys({
        title: joi_1.default.string().required(),
        firstName: joi_1.default.string(),
        lastName: joi_1.default.string(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref("password")).required(),
    }),
    login: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }),
    verifyEmail: joi_1.default.object().keys({
        token: joi_1.default.string().required(),
    }),
};
