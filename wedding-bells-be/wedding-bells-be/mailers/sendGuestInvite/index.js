const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const sendMail = require("../sendMail");

const emailSource = fs.readFileSync(
	path.join(__dirname, "guest-invite.hbs"),
	"utf-8"
);
const template = Handlebars.compile(emailSource);

const mailOptions = (email, locals) => {
	return {
		from: `"Invites by H3rra" <hello@h3rra.com>`,
		to: email,
		subject: "You're Invited! | H3rra Weddings",
		html: template(locals),
	};
};

module.exports = (guest, couple, guestInviteURL) => {
	const { spouse_one_name, spouse_two_name } = couple;
	const guestName = guest.name;
	return sendMail(
		mailOptions(guest.email, {
			guestInviteURL,
			spouse_one_name,
			spouse_two_name,
			guestName,
		})
	);
};
