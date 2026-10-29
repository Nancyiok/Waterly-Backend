import { EMAIL, EMAIL_TEXTS } from '../../common/constants/email.constant';

export type EmailImage = {
  file: string;
  cid: string;
  width: number;
  height: number;
};

export type EmailContent = {
  title: string;
  titleImage: EmailImage;
  text: string;
  button: string;
  note: string;
  url: string;
};

const { COLORS, RADIUS, IMAGES } = EMAIL;

const FONT =
  "'Montserrat', 'Century Gothic', Futura, 'Trebuchet MS', Arial, sans-serif";

export const renderEmail = ({
  title,
  titleImage,
  text,
  button,
  note,
  url,
}: EmailContent) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link href="${EMAIL.FONTS_URL}" rel="stylesheet" />
    <style>
      @import url('${EMAIL.FONTS_URL}');
      body, table, td, h1, p, a { font-family: ${FONT}; }
    </style>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.background};font-family:${FONT};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.background};padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:${IMAGES.BANNER.width}px;">
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <img src="cid:${IMAGES.LOGO.cid}" width="${IMAGES.LOGO.width}" height="${IMAGES.LOGO.height}" alt="Waterly" style="display:block;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="background:${COLORS.white};border:1px solid ${COLORS.border};border-radius:${RADIUS.card};overflow:hidden;">
                <img src="cid:${IMAGES.BANNER.cid}" width="${IMAGES.BANNER.width}" alt="" style="display:block;width:100%;height:auto;border:0;border-radius:${RADIUS.card} ${RADIUS.card} 0 0;" />
                <div style="padding:32px;text-align:center;">
                  <img src="cid:${titleImage.cid}" width="${titleImage.width}" height="${titleImage.height}" alt="${title}" style="display:block;margin:0 auto 16px;border:0;font-size:24px;font-weight:600;color:${COLORS.primaryDark};" />
                  <p style="margin:0 0 28px;font-size:15px;line-height:24px;color:${COLORS.text};">${text}</p>
                  <a href="${url}" target="_blank" style="display:inline-block;padding:12px 28px;background:${COLORS.primary};color:${COLORS.white};font-size:15px;font-weight:600;text-decoration:none;border-radius:${RADIUS.button};">${button}</a>
                  <p style="margin:28px 0 0;padding:14px 16px;background:${COLORS.primaryFoam};border-radius:${RADIUS.card};font-size:13px;line-height:20px;color:${COLORS.primaryDark};">${note}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:24px;font-size:13px;color:${COLORS.text};">${EMAIL_TEXTS.FOOTER}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
