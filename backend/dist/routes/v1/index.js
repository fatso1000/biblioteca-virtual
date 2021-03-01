"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = __importDefault(require("./access/signup"));
const login_1 = __importDefault(require("./access/login"));
const verify_email_1 = __importDefault(require("./access/verify-email"));
const user_1 = __importDefault(require("./profile/user"));
const uploadBook_1 = __importDefault(require("./books/uploadBook"));
const router = express_1.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
// router.use('/', apikey);
/*-------------------------------------------------------------------------*/
router.use("/signup", signup_1.default);
router.use("/login", login_1.default);
router.use("/verify-email", verify_email_1.default);
router.use("/profile", user_1.default);
router.use("/book-upload", uploadBook_1.default);
exports.default = router;
