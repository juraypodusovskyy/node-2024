import { CronJob } from "cron";

import { EEmailType } from "../enums/email.enum";
import { timeHelper } from "../helpers/time.helper";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const sendOldVisitEmails = async () => {
  try {
    const date = timeHelper.getTime(7, "days");
    const users = await userRepository.findInactiveUsersByToken(date);

    if (users.length === 0) {
      console.log("No inactive users found.");
      return;
    }

    await Promise.all(
      users.map(async ({ email, name }) => {
        try {
          await emailService.sendEmail(email, EEmailType.OLD_VISIT, { name });
        } catch (emailError) {
          console.error(`Failed to send email to ${email}`, emailError);
        }
      }),
    );
  } catch (error) {
    console.error("Error in sending old visit emails", error);
  }
};

export const oldVisit = new CronJob("0 0 * * 0", sendOldVisitEmails);
