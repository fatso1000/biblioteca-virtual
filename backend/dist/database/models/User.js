"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.COLLETION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "User";
exports.COLLETION_NAME = "users";
const schema = new mongoose_1.Schema({
    email: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        trim: true,
        select: false,
        required: true,
    },
    password: { type: mongoose_1.Schema.Types.String, select: false },
    title: { type: mongoose_1.Schema.Types.String, required: true },
    firstName: mongoose_1.Schema.Types.String,
    lastName: mongoose_1.Schema.Types.String,
    role: { type: mongoose_1.Schema.Types.String, required: true },
    verificationToken: mongoose_1.Schema.Types.String,
    verified: mongoose_1.Schema.Types.Date,
    resetToken: {
        token: mongoose_1.Schema.Types.String,
        expires: mongoose_1.Schema.Types.Date,
    },
    passwordResetAt: mongoose_1.Schema.Types.Date,
    createdAt: { type: mongoose_1.Schema.Types.Date, default: Date.now },
    updatedAt: mongoose_1.Schema.Types.Date,
});
schema.virtual("isVerified").get(function () {
    // @ts-ignore
    return !!(this.verified || this.passwordResetAt);
});
schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    },
});
exports.UserModel = mongoose_1.model(exports.DOCUMENT_NAME, schema, exports.COLLETION_NAME);
