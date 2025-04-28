import mongoose from "mongoose";
import envConfig from "./env.config.js"

const {dbName, mongoUri} = envConfig;

export const connectMongoose = async () => {
  try {
    await mongoose.connect(mongoUri, {
      dbName
    });
    console.log("MongoDB connected successfully with mongoose");
  } catch (error) {
    console.log("Error while connecting to mongoDB");
    console.log(error);
  }
};
