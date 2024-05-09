import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const app = express();
app.use(bodyParser.json());

dotenv.config();

app.post('/api/mail', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error);
    }

    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;
