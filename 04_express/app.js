import express from "express";
import logger from "morgan";
import {router as consolesRouter} from "./routes/consolesRouter.js";
import {router as gamesRouter} from "./routes/gamesRouter.js";

const app = express()
app.use(logger("dev"))
app.listen(3000)
app.use("/api", consolesRouter);
