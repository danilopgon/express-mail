import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import { check, validationResult } from 'express-validator';

interface MailBody {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Vercel!');
});

app.post(
  '/api/mail',
  [
    // validation rules
    check('name').notEmpty().withMessage('El normbre es requerido'),
    check('email').isEmail().withMessage('El email no es válido'),
    check('phone').notEmpty().withMessage('El teléfono es requerido'),
    check('subject').notEmpty().withMessage('El asunto es requerido'),
    check('message').notEmpty().withMessage('El mensaje es requerido'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, subject, message } = req.body as MailBody;

    const transporter = nodemailer.createTransport({
      host: 'uk5.fcomet.com',
      port: 465,
      secure: true,
      auth: {
        user: ,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: process.env.MAIL_TO,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(
      mailOptions,
      (error: any, info: nodemailer.SentMessageInfo) => {
        if (error) {
          return res.status(500).send(error);
        }

        res.status(200).send('Email sent: ' + info.response);
      }
    );
  }
);

app.listen(3000, () => console.log('Server ready on port 3000.'));

export default app;
