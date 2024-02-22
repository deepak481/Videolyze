import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, //This allows the browser to send cookies and other credentials along with the request.
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import user router

import userRouter from "./routes/user.route.js";

// declaring routes

app.use("/api/v1/users", userRouter);
// cannot use get/post... with userRouter because previously both routing and controller were in app.js only, but now both router
// and controller both extracted from it into another seperate files so we have to use router as a middleware

export default app;
