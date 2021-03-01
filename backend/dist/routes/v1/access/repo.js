"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_request_1 = __importDefault(require("../../../middlewares/validate-request"));
const schema_1 = __importDefault(require("./schema"));
const UserRepo_1 = __importDefault(require("../../../database/repos/UserRepo"));
class Repo {
    static signupSchema(req, res, next) {
        const schema = schema_1.default.signup;
        validate_request_1.default(req, next, schema);
    }
    static signup(req, res, next) {
        UserRepo_1.default.register(req.body, req.get("origin"))
            .then(() => res.status(200).json({
            message: "Registratin successful, please check your email for verification instructions.",
        }))
            .catch(next);
    }
    static loginSchema(req, res, next) {
        const schema = schema_1.default.login;
        validate_request_1.default(req, next, schema);
    }
    static login(req, res, next) {
        const { email, password } = req.body;
        console.log(email, password);
        const ipAddress = req.ip;
        UserRepo_1.default.authenticate({
            email,
            password,
            ipAddress,
        })
            .then((_a) => {
            var { refreshToken } = _a, account = __rest(_a, ["refreshToken"]);
            Repo.setTokenCookie(res, refreshToken);
            res.status(200).json(account);
        })
            .catch(next);
    }
    static verifyEmailSchema(req, res, next) {
        const schema = schema_1.default.verifyEmail;
        validate_request_1.default(req, next, schema);
    }
    static verifyEmail(req, res, next) {
        UserRepo_1.default.verifyEmail(req.body).then(() => res
            .status(200)
            .json({ message: "Verification successful, you can now login" }));
    }
    static refreshToken(req, res, next) {
        const token = req.cookies.refreshToken;
        const ipAddress = req.ip;
        UserRepo_1.default.refreshToken({ token, ipAddress })
            .then((_a) => {
            var { refreshToken } = _a, user = __rest(_a, ["refreshToken"]);
            this.setTokenCookie(res, refreshToken);
            res.json(user);
        })
            .catch(next);
    }
    // helper
    static setTokenCookie(res, token) {
        const cookieOptions = {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };
        res.cookie("refreshToken", token, cookieOptions);
    }
}
exports.default = Repo;
