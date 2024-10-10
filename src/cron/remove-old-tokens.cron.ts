import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { timeHelper } from "../helpers/time.helper";
import { Token } from "../models/token.model";

const handler = async () => {
  console.log("remove old token");
  const days = +timeHelper.parseConfigString(configs.JWT_FORGOT_EXPIRATION);
  const date = timeHelper.getTime(days, "minutes");
  await Token.deleteMany({ createdAt: { $lt: date } });
};

export const removeOldToken = new CronJob("0 0 * * 0", handler);
