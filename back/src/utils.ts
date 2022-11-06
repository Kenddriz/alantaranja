import {
  access,
  constants,
  createWriteStream,
  existsSync,
  mkdirSync,
  unlinkSync,
} from 'fs';
import { UnauthorizedException } from '@nestjs/common';
import { join } from 'path';
import { Upload } from './shared/shared.input';

type FileParams = {
  filename: string;
  mimetype: string;
};

export const publicDir = () =>
  process.env.NODE_ENV === 'development'
    ? join(__dirname, '..', 'public/')
    : 'public/';

export const upload = async (
  file: Upload,
  dossier: string,
): Promise<FileParams> => {
  const { createReadStream, filename, mimetype } = await file;

  const m_filename = Date.now() + filename.substring(-5);

  const path = `${publicDir()}${dossier}/`;
  if (!existsSync(path)) mkdirSync(path, { recursive: true });

  const uploaded = await new Promise((resolve, reject) =>
    createReadStream()
      .pipe(createWriteStream(`${path}${m_filename}`))
      .on('finish', () => resolve(true))
      .on('error', () => reject(false)),
  );
  if (!uploaded) throw new UnauthorizedException(`failed`);

  return { filename: m_filename, mimetype };
};
export const removeFile = (filename: string): boolean => {
  const path = publicDir() + filename;
  let removed = false;
  access(path, constants.F_OK, (err) => {
    if (!err) {
      try {
        unlinkSync(path);
        removed = true;
      } catch {}
    }
  });
  return removed;
};

/**Mailer*/
/**Mailer*/
const nodemailer = require('nodemailer');

export async function sendMail(mailOptions: any): Promise<boolean> {
  return new Promise<boolean>(async (resolve) => {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports*/
      auth: {
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        resolve(false);
      } else if (info) resolve(true);
    });
  });
}

export function genCode() {
  return Math.floor(100000 + Math.random() * 900000);
}