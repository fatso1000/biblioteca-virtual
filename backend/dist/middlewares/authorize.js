"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = __importDefault(require("express-jwt"));
const config_1 = require("../config");
const User_1 = require("../database/models/User");
const RefreshToken_1 = require("../database/models/RefreshToken");
function authorize(roles = []) {
    if (typeof roles === "string") {
        roles = [roles];
    }
    return [
        // authenticate JWT token and attach user to request object (req.user)
        express_jwt_1.default({ secret: config_1.secret, algorithms: ["HS256"] }),
        (err, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // Error handler
            if (err.name === "UnauthorizedError") {
                res.status(err.status).send({ message: err.message });
                return;
            }
            const account = yield User_1.UserModel.findById(req.user.id);
            const refreshToken = yield RefreshToken_1.RefreshToken.find({ account: account === null || account === void 0 ? void 0 : account.id });
            // @ts-ignore
            if (!account || (roles.length && !roles.includes(account.role))) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user.role = account.role;
            req.user.ownsToken = (token) => !!refreshToken.find((x) => x.token === token);
            next();
        }),
    ];
}
exports.default = authorize;
