"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function isValidId(id) {
    return mongoose_1.Types.ObjectId.isValid(id);
}
exports.default = isValidId;
