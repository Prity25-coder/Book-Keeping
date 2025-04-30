import express from "express";
import userRouter from "./app/users/routes/user.routes.js";
import ENV_CONFIG from "./config/env.config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import compression from "compression";
import helmet from "helmet";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { loggerMiddleware } from "./common/index.js";
import bookRouter from "./app/books/routes/book.routes.js";
import libraryRouter from "./app/libraries/routes/library.routes.js";

// create app
const app = express();

// Create session store
const store = MongoStore.create({
  mongoUrl: ENV_CONFIG.mongoUri,
  dbName: ENV_CONFIG.dbName,
  collectionName: "sessions",
  ttl: ENV_CONFIG.sessionTimeOut / 1000, // Convert ms to seconds
  autoRemove: "native",
});

// create Store for storing sessions
app.use(
  session({
    secret: ENV_CONFIG.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: ENV_CONFIG.mongoUri,
      dbName: ENV_CONFIG.dbName, // Optional but recommended
      collectionName: "sessions",
      ttl: 24 * 60 * 60, // 1 day in seconds
      autoRemove: "native", // Optional - native MongoDB TTL index
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: "lax", //Recommended for CSRF protection
    },
  })
);

// session configuration
const { sessionSecret, sessionTimeOut } = ENV_CONFIG;
app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: false, // don't create session until something stored
    resave: false, // don't save session if unmodified
    cookie: {
      secure: "auto",
      httpOnly: true,
      maxAge: sessionTimeOut,
    },
    store: store,
  })
);

// parse json of incoming request body
app.use(express.json({ limit: "17kb" }));

// configure urlencoded data
app.use(express.urlencoded({ limit: "17kb", extended: true }));

// add cookie parser middleware to interact with cookies
app.use(cookieParser());

//* setting HTTP response headers.
app.use(helmet());

//* compress all responses
app.use(compression());

// request logger middleware
app.use(loggerMiddleware);

// User routes
app.use("/api/users", userRouter);

// Book routes
app.use("/api/books", bookRouter);

// Libraries and Library Inventory routes
app.use("/api/libraries", libraryRouter);

// Libraries and Library Inventory routes
// app.use("/api/libraries", libraryRouter)

export default app;
