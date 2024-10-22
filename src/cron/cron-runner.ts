import { oldVisit } from "./old-visit.cron";
import { removeOldToken } from "./remove-old-tokens.cron";

export const cronRunner = () => {
  console.log("cron run");
  removeOldToken.start();
  oldVisit.start();
};
