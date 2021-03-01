"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepo_1 = __importDefault(require("../../../database/repos/UserRepo"));
class Repo {
    static getAll(req, res, next) {
        UserRepo_1.default.getAll()
            .then((accounts) => res.status(200).json(accounts))
            .catch(next);
    }
}
exports.default = Repo;
