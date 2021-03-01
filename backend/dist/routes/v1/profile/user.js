"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorize_1 = __importDefault(require("../../../middlewares/authorize"));
const config_1 = require("../../../config");
const repo_1 = __importDefault(require("./repo"));
const router = express_1.Router();
// @ts-ignore
router.get("/all", authorize_1.default(config_1.roles.Admin), repo_1.default.getAll);
exports.default = router;
