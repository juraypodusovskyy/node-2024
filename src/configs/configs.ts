import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_PORT: process.env.APP_PORT,
  MONGO_URL: process.env.MONGO_URL,
  PASSWORD_SOL: process.env.PASSWORD_SOL,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
};
