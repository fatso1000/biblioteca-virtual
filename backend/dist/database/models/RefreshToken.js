"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "RefreshToken";
exports.COLLECTION_NAME = "refreshtoken";
const schema = new mongoose_1.Schema({
    user: { type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }] },
    token: mongoose_1.Schema.Types.String,
    expiresAt: mongoose_1.Schema.Types.Date,
    createdAt: { type: mongoose_1.Schema.Types.Date, default: Date.now },
    createdByIp: mongoose_1.Schema.Types.String,
    revokedAt: mongoose_1.Schema.Types.Date,
    revokedByIp: mongoose_1.Schema.Types.String,
    replacedByToken: mongoose_1.Schema.Types.String,
});
schema.virtual("isExpired").get(function () {
    return Date.now() >= this.expiresAt;
});
schema.virtual("isActive").get(function () {
    return !this.revoked && !this.isExpired;
});
exports.RefreshToken = mongoose_1.model(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
