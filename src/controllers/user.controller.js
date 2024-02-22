import asyncHandler from "../utils/asyncHandler.js";

const userRegistration = asyncHandler((req, res, next) => {
  res.status(200).json({
    message: "ok",
  });
});

export { userRegistration };
