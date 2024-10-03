import nodemailer, { Transporter } from "nodemailer";
import HbsTransporter from "nodemailer-express-handlebars";
import path from "path";

import { configs } from "../configs/configs";
import { emailConstant } from "../constants/email.constant";
import { EEmailType } from "../enums/email.enum";
import { IEmailContext } from "../interfaces/email-message.interface";

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.SMTP_EMAIL,
        pass: configs.SMTP_PASSWORD,
      },
    });

    const hbsOptional = {
      viewEngine: {
        extname: ".hbs",
        partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
        layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
      },
      viewPath: path.join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };

    this.transporter.use("compile", HbsTransporter(hbsOptional));
  }

  public async sendEmail(
    to: string,
    emailType: EEmailType,
    context: IEmailContext,
  ): Promise<void> {
    const emailOptions = emailConstant[emailType];
    const options = {
      ...emailOptions,
      context,
      to,
      from: configs.SMTP_EMAIL,
    };

    await this.transporter.sendMail(options);
  }
}

export const emailService = new EmailService();
