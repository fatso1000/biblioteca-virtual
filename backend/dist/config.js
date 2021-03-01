"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsUrl = exports.db = exports.roles = exports.emailFrom = exports.smtpOptions = exports.secret = exports.port = exports.environment = void 0;
exports.environment = process.env.NODE_ENV;
exports.port = process.env.PORT;
exports.secret = process.env.SECRET || "SECRET EXAMPLE XD";
exports.smtpOptions = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "schuyler.wiza31@ethereal.email",
        pass: "qTh4QHkzk24aUgATeH",
    },
};
exports.emailFrom = process.env.EMAIL_FROM || "schuyler.wiza31@ethereal.email";
exports.roles = {
    Admin: "Admin",
    User: "User",
};
exports.db = {
    name: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    port: process.env.DB_PORT || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_USER_PWD || "",
    uri: process.env.ATLAS_URI || "",
};
exports.corsUrl = process.env.CORS_URL || '';
