"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
dotenv_1.default.config();
app.post('/api/mail', (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    const transporter = nodemailer_1.default.createTransport({
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
exports.default = app;
//# sourceMappingURL=index.js.map