"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookInfoModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "BookInfo";
exports.COLLECTION_NAME = "booksInfo";
const schema = new mongoose_1.Schema({
    bookId: {
        type: mongoose_1.Schema.Types.String,
    },
    title: { type: mongoose_1.Schema.Types.String, required: true },
    author: mongoose_1.Schema.Types.String,
    publishedAt: mongoose_1.Schema.Types.Date,
    description: { type: mongoose_1.Schema.Types.String, required: true, maxlength: 2000 },
    tags: { type: [{ type: mongoose_1.Schema.Types.String, trim: true, uppercase: true }] },
    urlPdf: { type: mongoose_1.Schema.Types.String, required: true, trim: true },
});
schema.set("toJson", {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
exports.BookInfoModel = mongoose_1.model(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
