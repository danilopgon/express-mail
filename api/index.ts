import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

interface MailBody {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const app = express();
app.use(bodyParser.json());

dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Vercel!');
});

app.post('/api/mail', (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body as MailBody;

  const transporter = nodemailer.createTransport({
    host: 'uk5.fcomet.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.NODEMAILER_USER,
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error: any, info: nodemailer.SentMessageInfo) => {
    if (error) {
      return res.status(500).send(error);
    }

    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(3000, () => console.log('Server ready on port 3000.'));

export default app;