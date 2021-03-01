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
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_helpers_1 = __importDefault(require("../../helpers/User-helpers"));
const config_1 = require("../../config");
class AccountRepo {
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_helpers_1.default.getAccountId(id);
            return User_helpers_1.default.basicDetails(user);
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.UserModel.find();
            return users.map((x) => User_helpers_1.default.basicDetails(x));
        });
    }
    static authenticate({ email, password, ipAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findOne({ email })
                .select("+email +password +role +id")
                .lean()
                .exec();
            if (!user)
                throw "User doesn't exists";
            if (!user.verified)
                throw "User is not verified";
            const verify = bcryptjs_1.default.compareSync(password, user.password);
            if (!verify)
                throw "Password incorrect";
            const jwtToken = User_helpers_1.default.generateJwtToken(user);
            const refreshToken = User_helpers_1.default.generateRefreshToken(user, ipAddress);
            yield refreshToken.save();
            return Object.assign(Object.assign({}, User_helpers_1.default.basicDetails(user)), { jwtToken, refreshToken: refreshToken.token });
        });
    }
    static register(params, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield User_1.UserModel.findOne({ email: params.email })) {
                return yield User_helpers_1.default.sendAlreadyRegisteredEmail(params.email, origin);
            }
            const user = new User_1.UserModel(params);
            const isFirstUser = (yield User_1.UserModel.countDocuments({})) === 0;
            user.role = isFirstUser ? config_1.roles.Admin : config_1.roles.User;
            user.verificationToken = User_helpers_1.default.randomTokenString();
            user.password = User_helpers_1.default.hash(params.password);
            yield user.save();
            yield User_helpers_1.default.sendVerificationEmail(user, origin);
        });
    }
    static refreshToken({ token, ipAddress }) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield User_helpers_1.default.getRefreshToken(token);
            const user = refreshToken;
            const newRefreshToken = User_helpers_1.default.generateRefreshToken(user, ipAddress);
            refreshToken.revokedAt = Date.now();
            refreshToken.revokedByIp = ipAddress;
            refreshToken.replacedByToken = newRefreshToken.token;
            yield refreshToken.save();
            yield newRefreshToken.save();
            const jwtToken = User_helpers_1.default.generateJwtToken(user);
            return Object.assign(Object.assign({}, User_helpers_1.default.basicDetails(user)), { jwtToken, refreshToken: newRefreshToken.token });
        });
    }
    static verifyEmail({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findOne({ verificationToken: token });
            if (!user)
                throw "Verification failed";
            user.verified = Date.now();
            user.verificationToken = undefined;
            yield user.save();
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield User_1.UserModel.find();
            return accounts.map((x) => User_helpers_1.default.basicDetails(x));
        });
    }
}
exports.default = AccountRepo;
