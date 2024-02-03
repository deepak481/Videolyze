import dotenv from "dotenv";
//we load env variables here because we want to load them also when our first file loads
import express from "express";
import connectDB from "./db/index.js";
const app = express();
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

// this code is also good but properly seperated code is more readable
/*
import "dotenv/config";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
const app = express();

//use ; before a iife function because may be there is no ; at end of previous line of code
//which can create problem

(async () => {
  try {
    console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (err) => {
      console.error("error", err);
      throw err;
    });
    app.listen(process.env.PORT, () => {
      console.log(`app is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error connecting to Mongo", error);
    throw error;
  }
})();

*/
