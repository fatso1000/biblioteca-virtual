"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Book";
exports.COLLECTION_NAME = "books";
const schema = new mongoose_1.Schema({
    createdAt: { type: mongoose_1.Schema.Types.Date, default: Date.now },
    createdBy: { type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }] },
    createdByIp: mongoose_1.Schema.Types.String,
    frontUrl: { type: mongoose_1.Schema.Types.String, maxlength: 500, required: false, trim: true }
});
exports.BookModel = mongoose_1.model(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
