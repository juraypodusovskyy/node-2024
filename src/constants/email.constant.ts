import { EEmailType } from "../enums/email.enum";

export const emailConstant = {
  [EEmailType.WELCOME]: {
    template: EEmailType.WELCOME,
    subject: EEmailType.WELCOME,
  },
  [EEmailType.FORGOT_PASSWORD]: {
    template: EEmailType.FORGOT_PASSWORD,
    subject: "Forgot password",
  },
  [EEmailType.LOGOUT]: {
    template: EEmailType.LOGOUT,
    subject: EEmailType.LOGOUT,
  },
  [EEmailType.OLD_VISIT]: {
    template: EEmailType.OLD_VISIT,
    subject: "Old visit",
  },
};
