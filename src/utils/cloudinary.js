import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // upload completed
    console.log("file is uploaded to cloudinary ", response.url);

    fs.unlinkSync(localFilePath, () => {
      // console.log(`${localFilePath} removed from local filesystem`);
    });
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath, () => {
      // console.log(`${localFilePath} removed from local filesystem`);
    });
    return null;
  }
};

const deleteFromCloudinaryByUrl = async (imageUrl) => {
  try {
    if (!imageUrl) return null;

    // Extract public ID from URL
    const publicId = await extractPublicIdFromUrl(imageUrl);

    // Delete image from Cloudinary using public ID
    const deletionResponse = await cloudinary.uploader.destroy(publicId);

    console.log("Image deleted from Cloudinary");

    return deletionResponse;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return null;
  }
};

const extractPublicIdFromUrl = async (imageUrl) => {
  // Extract public ID from Cloudinary URL pattern
  const regex = /\/([^/]+)\.[a-zA-Z0-9]+$/;
  const match = await imageUrl.match(regex);
  if (match && match.length > 1) {
    return match[1];
  }
  return null;
};

export { uploadOnCloudinary, deleteFromCloudinaryByUrl };
