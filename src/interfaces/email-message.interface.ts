interface IBaseEmailWithName {
  name: string;
  frontUrl: string;
}

interface IBaseEmailWithToken {
  frontUrl: string;
  actionToken: string;
}

interface IWelcome extends IBaseEmailWithName, IBaseEmailWithToken {}

type IOldVisit = IBaseEmailWithName;

type ILogout = IOldVisit;

type IForgotPassword = IBaseEmailWithToken;

export type IEmailContext = IWelcome | IOldVisit | ILogout | IForgotPassword;
