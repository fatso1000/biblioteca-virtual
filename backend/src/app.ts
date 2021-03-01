import "rootpath";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { corsUrl } from "./config";
import "./database";
import routesV1 from "./routes/v1";

process.on("uncaughtException", (e) => {
  console.error(e);
});

const app = express();

app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: corsUrl,
    optionsSuccessStatus: 200,
  })
);

app.use("/v1", routesV1);

export default app;
