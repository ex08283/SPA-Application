import express from "express";
import logger from "morgan";
import cors from "cors"
import {router as consolesRouter} from "./routes/consolesRouter.js";
import * as bodyParser from "express";



const app = express()
app.options("/api",cors()); // enable pre-flight request
app.use("/api",cors({ "exposedHeaders":"Location"}));
app.use(bodyParser.json());
app.use(logger("dev"))
app.listen(3000)
app.use("/api", consolesRouter);
