import dotenv from "dotenv";

dotenv.config();

export const configs = {
  APP_PORT: process.env.APP_PORT,

  MONGO_URL: process.env.MONGO_URL,

  PASSWORD_SOL: process.env.PASSWORD_SOL,

  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
  JWT_ACTIVATE_EXPIRATION: process.env.JWT_WELCOME_EXPIRATION,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACTIVATE_SECRET: process.env.JWT_WELCOME_SECRET,

  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_EMAIL: process.env.SMTP_EMAIL,

  FRONT_URL: process.env.FRONT_URL,
};
