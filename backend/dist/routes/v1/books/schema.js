"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    uploadBook: joi_1.default.object().keys({
        title: joi_1.default.string().min(3).max(500).required(),
        author: joi_1.default.string().required(),
        description: joi_1.default.string().required().min(3).max(2000),
        tags: joi_1.default.array().optional().min(0).items(joi_1.default.string().uppercase()),
        urlPdf: joi_1.default.string().uri().required().max(200)
    }),
};
