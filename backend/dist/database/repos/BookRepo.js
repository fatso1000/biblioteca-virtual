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
const Book_helpers_1 = __importDefault(require("../../helpers/Book-helpers"));
const Book_1 = require("../models/Book");
class BookRepo {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield Book_1.BookModel.find();
            return books.map((x) => x);
        });
    }
    static uploadBook(params, { token, ipAddress }) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = yield Book_helpers_1.default.getRefreshToken(token);
            const user = refreshToken;
            const newBook = Book_helpers_1.default.generateBook(user, "https://dummyimage.com/600x400/000/fff", ipAddress);
            const bookId = newBook.id;
            // return bookId;
            yield newBook.save();
            // const bookInfo = await BookHelpers.getBookId(bookId);
            //   console.log("bookInfo: ", bookInfo)
            // return bookInfo;
            const newBookInfo = yield Book_helpers_1.default.generateBookInfo(bookId, params);
            yield newBookInfo.save();
            // return newBookInfo;
            // console.log("params: ", params);
        });
    }
}
exports.default = BookRepo;
