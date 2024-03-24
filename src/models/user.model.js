import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: "string",
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true, // it is better to turn on index for making search of field efficiently
      // don't make index true for every field as it impacts performance badly
    },
    email: {
      type: "string",
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: "string",
      required: true,
      trim: true,
    },
    avatar: {
      type: "string", // cloudinary url
      required: true,
    },
    coverImage: {
      type: "string", // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vedio",
      },
    ],
    password: {
      type: "string",
      required: [true, "Password is required"], // similarly we can feed custom message to all fields which are true
    },
    refreshToken: {
      type: "string",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this.id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = model("User", userSchema);
