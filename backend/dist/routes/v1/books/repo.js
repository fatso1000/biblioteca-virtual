"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_request_1 = __importDefault(require("../../../middlewares/validate-request"));
const BookRepo_1 = __importDefault(require("../../../database/repos/BookRepo"));
const schema_1 = __importDefault(require("./schema"));
class Repo {
    static uploadBookSchema(req, res, next) {
        const schema = schema_1.default.uploadBook;
        validate_request_1.default(req, next, schema);
    }
    static uploadBook(req, res, next) {
        const token = req.cookies.refreshToken;
        const ipAddress = req.ip;
        BookRepo_1.default.uploadBook(req.body, { token, ipAddress })
            .then((respuesta) => res.status(200).json({ msg: "Book uploaded", respuesta }))
            .catch(next);
    }
}
exports.default = Repo;
