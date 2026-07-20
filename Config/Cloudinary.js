import { v2 as cloudinary } from "cloudinary";
import Config from "./Config.js";

function connectCloud() {
  cloudinary.config({
    cloud_name: Config.cloudinary_cloud_name,
    api_key: Config.cloudinary_api_key,
    api_secret: Config.cloudinary_api_secret,
  });
}

async function uploadCloudinary(files) {
  try {
    const uploadedResult = [];

    for (const file of files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
            },
            (error, data) => {
              if (error) return reject(error);
              resolve(data);
            },
          )
          .end(file.buffer);
      });

      uploadedResult.push(result);
    }

    return uploadedResult;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Cloudinary failed ${error.message}`,
    });
  }
}

const deleteCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

export { connectCloud, uploadCloudinary, deleteCloudinary };
