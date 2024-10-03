import { EEmailType } from "../enums/email.enum";

interface IWelcomeContext {
  name: string;
  frontUrl?: string;
  actionToken: string;
}

interface IOldVisitContext {
  name: string;
  frontUrl?: string;
}

interface IForgotPasswordContext {
  frontUrl?: string;
  actionToken: string;
}

type EmailContextMapping = {
  [EEmailType.WELCOME]: IWelcomeContext;
  [EEmailType.OLD_VISIT]: IOldVisitContext;
  [EEmailType.LOGOUT]: IOldVisitContext;
  [EEmailType.FORGOT_PASSWORD]: IForgotPasswordContext;
};

export type IEmailContext<T extends EEmailType> = EmailContextMapping[T];
