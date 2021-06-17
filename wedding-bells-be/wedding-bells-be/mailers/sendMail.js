const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_SMTP_HOST,
	port: process.env.EMAIL_SMTP_PORT,
	secure: process.env.NODE_ENV === "production" ? true : false,
	auth: {
		user: process.env.EMAIL_SMTP_USERNAME,
		pass: process.env.EMAIL_SMTP_PASSWORD,
	},
});

module.exports = async mailOptions => {
	const info = await transporter.sendMail(mailOptions);
	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
