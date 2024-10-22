import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { timeHelper } from "../helpers/time.helper";
import { Token } from "../models/token.model";

const handler = async () => {
  try {
    console.log("Starting token cleanup...");

    const days = +timeHelper.parseConfigString(configs.JWT_FORGOT_EXPIRATION);
    const date = timeHelper.getTime(days, "days");

    await Token.deleteMany({ createdAt: { $lt: date } });
  } catch (error) {
    console.error("Error during token cleanup:", error);
  }
};

export const removeOldToken = new CronJob("0 0 * * 0", handler);
