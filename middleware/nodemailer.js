import nodemailer from 'nodemailer';
export const nodemailerEmail = (email, subject, text) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: 'chetanmalviya924@gmail.com',
            pass: 'xnjihlicgwwgfyez'
        },
        connectionTimeout: 5 * 60 * 1000, // 5 min
    });
    var mailOptions = {
        from: 'chetanmalviya924@gmail.com',
        to: '24chetanmalviya@gmail.com',
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
}