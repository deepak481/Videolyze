import { Router } from "express";
import {
  changePassword,
  getCurrentUser,
  getUserChannelProfile,
  refreshAccessToken,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
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

userRouter.route("/refresh-token").post(refreshAccessToken);

userRouter.route("/change-password").post(verifyJWT, changePassword);

userRouter
  .route("/change-account-details")
  .post(verifyJWT, updateAccountDetails);

userRouter.route("/get-current-user").post(verifyJWT, getCurrentUser);

userRouter.route("/update-user-avatar").post(
  verifyJWT,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  updateUserAvatar
);

userRouter.route("/update-user-cover-image").post(
  verifyJWT,
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  updateUserCoverImage
);

userRouter
  .route("/get-user-channel-profile")
  .post(verifyJWT, getUserChannelProfile);

export default userRouter;
