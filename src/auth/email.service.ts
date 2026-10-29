import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  renderEmail,
  type EmailContent,
  type EmailImage,
} from './templates/email.template';
import { EMAIL, EMAIL_TEXTS } from '../common/constants/email.constant';

@Injectable()
export class EmailService {
  private resend: Resend;

  private readonly imageFiles = new Map(
    Object.values(EMAIL.IMAGES).map(({ file }) => [
      file,
      readFileSync(join(process.cwd(), EMAIL.ASSETS_DIR, file)),
    ]),
  );

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
  }

  async sendVerificationEmail(email: string, token: string) {
    const { subject, ...content } = EMAIL_TEXTS.VERIFY_EMAIL;
    await this.send(email, subject, {
      ...content,
      titleImage: EMAIL.IMAGES.VERIFY_EMAIL_TITLE,
      url: this.getAppUrl(`/verify-email?token=${token}`),
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const { subject, ...content } = EMAIL_TEXTS.RESET_PASSWORD;
    await this.send(email, subject, {
      ...content,
      titleImage: EMAIL.IMAGES.RESET_PASSWORD_TITLE,
      url: this.getAppUrl(`/reset-password?token=${token}`),
    });
  }

  private toAttachment({ file, cid }: EmailImage) {
    return {
      filename: file,
      content: this.imageFiles.get(file),
      contentId: cid,
    };
  }

  private getAppUrl(path: string) {
    return `${this.configService.get<string>('APP_URL')}${path}`;
  }

  private async send(to: string, subject: string, content: EmailContent) {
    await this.resend.emails.send({
      from:
        this.configService.get<string>('RESEND_FROM_EMAIL') ??
        EMAIL.DEFAULT_FROM,
      to,
      subject,
      html: renderEmail(content),
      attachments: [
        EMAIL.IMAGES.LOGO,
        EMAIL.IMAGES.BANNER,
        content.titleImage,
      ].map((image) => this.toAttachment(image)),
    });
  }
}
