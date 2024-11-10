import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";

import { configs } from "./configs/configs";
import { cronRunner } from "./cron/cron-runner";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { commentRouter } from "./routers/comment.router";
import { passwordRouter } from "./routers/password.router";
import { productRouter } from "./routers/product.router";
import { userRouters } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/users", userRouters);
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.use("/password", passwordRouter);
app.use("/comments", commentRouter);

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
  },
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

app.listen(configs.APP_PORT, () => {
  mongoose.connect(configs.MONGO_URL).then(() => console.log("Connected!"));
  console.log(`starting the server on port ${configs.APP_PORT}`);
  cronRunner();
});
