import dotenv from "dotenv"

dotenv.config();

const config = {
    port:process.env.PORT,
    mongodb_url:process.env.MONGODB_URL,
    smtp_email:process.env.SMTP_EMAIL,
    smtp_password:process.env.SMTP_PASSWORD,
    jwt_secret:process.env.JWT_SECRET,
    cloudinary_cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET
}

export default config;



