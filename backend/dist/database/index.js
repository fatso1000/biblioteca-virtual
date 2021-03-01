"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const dbOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
};
// database connection
mongoose_1.default
    .connect(config_1.db.uri, dbOptions)
    .then(() => {
    console.info("MONGOOSE CONNECTION DONE");
})
    .catch((e) => {
    console.info("MONGOOSE CONNECTION ERROR!!!!");
    console.error(e);
});
// CONNECTIONS EVENTS
// succesfully connection
mongoose_1.default.connection.on("connected", () => {
    console.info("MONGOOSE DEFAULT CONNECTION OPEN TO " + config_1.db.uri);
});
// if the connections throws an error
mongoose_1.default.connection.on("error", (err) => {
    console.info("MONGOOSE DEFAULT CONNECTION DISCONNECTED");
});
// when the connection is disconnected
mongoose_1.default.connection.on("SIGINT", () => {
    mongoose_1.default.connection.close(() => {
        console.info("MONGOOSE DEFAULT CONNECTION DISCONNECTED THROUGH APP");
        process.exit(0);
    });
});
