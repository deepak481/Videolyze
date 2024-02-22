import { Router } from "express";
import { userRegistration } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/registration").post(userRegistration)

export default userRouter;