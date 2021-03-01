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
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const RefreshToken_1 = require("../database/models/RefreshToken");
const UserRepo_1 = __importDefault(require("../database/repos/UserRepo"));
const isValidId_1 = __importDefault(require("../middlewares/isValidId"));
const send_email_1 = __importDefault(require("./send-email"));
class AccountHelpers {
    static getAccountId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isValidId_1.default(id))
                throw "Account Not Found";
            const user = yield UserRepo_1.default.findById(id);
            if (!user)
                throw "Account not found";
            return user;
        });
    }
    static getRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield RefreshToken_1.RefreshToken.findOne({ token }).populate("users");
            if (!refreshToken || !refreshToken.isActive)
                throw "Invalid Token";
            return refreshToken;
        });
    }
    static setTokenCookie(res, token) {
        const cookieOption = {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };
        res.cookie("refreshToken", token, cookieOption);
    }
    static hash(password) {
        return bcryptjs_1.default.hashSync(password, 10);
    }
    static generateRefreshToken(user, ipAddress) {
        return new RefreshToken_1.RefreshToken({
            user: user.id,
            token: this.randomTokenString(),
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            createdByIp: ipAddress,
        });
    }
    static generateJwtToken(user) {
        return jsonwebtoken_1.default.sign({ sub: user.id, id: user.id }, config_1.secret, {
            expiresIn: "15m",
        });
    }
    static randomTokenString() {
        return crypto_1.default.randomBytes(40).toString("hex");
    }
    static sendVerificationEmail(user, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            if (origin) {
                const verifyUrl = `${origin}/account/verify-email?token=${user.verificationToken}`;
                message = `<p>Please click the below link to verify your email address:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
            }
            else {
                message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
          <p><code>${user.verificationToken}</code></p>`;
            }
            yield send_email_1.default({
                to: user.email,
                subject: "Sign-up Verification API - verify email",
                html: `<h4>Verify Email</h4>
          <p>Thanks for registering!</p>
          ${message}`,
            });
        });
    }
    static sendPasswordResetEmail(user, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            if (origin) {
                const resetUrl = `${origin}/account/reset-password?token=${user.resetToken.token}`;
                message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
            }
            else {
                message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                   <p><code>${user.resetToken.token}</code></p>`;
            }
            yield send_email_1.default({
                to: user.email,
                subject: "Sign-up Verification API - Reset Password",
                html: `<h4>Reset Password Email</h4>
               ${message}`,
            });
        });
    }
    static sendAlreadyRegisteredEmail(email, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            let message;
            if (origin) {
                message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
            }
            else {
                message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
            }
            yield send_email_1.default({
                to: email,
                subject: "Sign-up Verification API - Email Already Registered",
                html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`,
            });
        });
    }
    static basicDetails(user) {
        const { id, title, firstName, lastName, email, role, createdAt, updatedAt, isVerified, } = user;
        return {
            id,
            title,
            firstName,
            lastName,
            email,
            role,
            createdAt,
            updatedAt,
            isVerified,
        };
    }
}
exports.default = AccountHelpers;
