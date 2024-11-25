import { oldVisit } from "./old-visit.cron";
import { removeOldPurchase } from "./remove-old-purchase";
import { removeOldToken } from "./remove-old-tokens.cron";

export const cronRunner = () => {
  console.log("cron run");
  removeOldToken.start();
  removeOldPurchase.start();
  oldVisit.start();
};
