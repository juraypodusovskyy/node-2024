import nodemailer, { Transporter } from "nodemailer";

import { configs } from "../configs/configs";

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
  }

  public async sendEmail(to: string): Promise<void> {
    await this.transporter.sendMail({
      from: configs.SMTP_EMAIL,
      to,
      subject: "test email",
      text: "this is test email",
    });
  }
}

export const emailService = new EmailService();
