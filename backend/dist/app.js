"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rootpath");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = require("./config");
require("./database");
const v1_1 = __importDefault(require("./routes/v1"));
process.on("uncaughtException", (e) => {
    console.error(e);
});
const app = express_1.default();
app.use(express_1.default.urlencoded({ limit: "10mb", extended: false }));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    origin: config_1.corsUrl,
    optionsSuccessStatus: 200,
}));
app.use("/v1", v1_1.default);
exports.default = app;
