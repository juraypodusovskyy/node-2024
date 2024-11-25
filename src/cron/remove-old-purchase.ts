import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { Purchase } from "../models/purchase.model";

const handler = async () => {
  try {
    console.log("Starting purchase cleanup...");

    const date = timeHelper.getTime(7, "days");
    await Purchase.deleteMany({
      createdAt: { $lt: date },
      status: { $in: ["paid", "completed", "cancelled"] },
    });
  } catch (error) {
    console.error("Error during purchase cleanup:", error);
  }
};

export const removeOldPurchase = new CronJob("0 0 * * 0", handler);
