import { Router } from "express";
import {
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/registration").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  userRegistration
);

userRouter.route("/login").post(userLogin);

//secured routes
userRouter.route("/logout").post(verifyJWT, userLogout);

export default userRouter;
