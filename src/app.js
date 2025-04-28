import express from "express";
import userRouter from "./app/users/routes/user.routes.js";
import libraryRouter from "./app/libraries/routes/library.routes.js";

// create app

const app = express();

// parse json of incoming request body
app.use(express.json({ limit: "17kb" }));

// configure urlencoded data
app.use(express.urlencoded({ limit: "17kb", extended: true }));

// User routes
app.use("/api/users", userRouter);

// Libraries and Library Inventory routes
app.use("/api/libraries", libraryRouter)

export default app;
