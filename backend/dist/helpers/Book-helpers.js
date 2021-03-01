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
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("../database/models/Book");
const BookInfo_1 = require("../database/models/BookInfo");
const RefreshToken_1 = require("../database/models/RefreshToken");
class BookHelpers {
    static generateBook(user, frontUrl, ipAddress) {
        return new Book_1.BookModel({
            createdBy: user.id,
            createdByIp: ipAddress,
            frontUrl,
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
    static generateBookInfo(bookId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, description, tags, urlPdf } = params;
            return new BookInfo_1.BookInfoModel({
                bookId,
                title,
                author,
                description,
                tags,
                urlPdf,
            });
        });
    }
    static getBookId(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            // const obj_id = new ObjectId(bookId)
            const book = yield BookInfo_1.BookInfoModel.findOne({ bookId });
            if (!book)
                throw "Invalid id";
            return book;
        });
    }
}
exports.default = BookHelpers;
