"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorize_1 = __importDefault(require("../../../middlewares/authorize"));
const repo_1 = __importDefault(require("./repo"));
const config_1 = require("../../../config");
const router = express_1.Router();
// @ts-ignore
router.delete("/basic", authorize_1.default(config_1.roles), repo_1.default.logout);
exports.default = router;
