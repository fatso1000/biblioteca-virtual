"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repo_1 = __importDefault(require("./repo"));
const router = express_1.Router();
router.post("/basic", repo_1.default.signupSchema, repo_1.default.signup);
exports.default = router;
