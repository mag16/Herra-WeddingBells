# mailer

Simply put, a mailer is a program that sends emails. Being able to send emails
from any application is beneficial as it allows you (the developer) to verify
your users' identity as well as have a means of communication between your users
and your application state to name a few examples.

For H3rra, we currently use a mailer to send guests their RSVP when a couple
decides to invite them to their wedding from the frontend app.

Due to the nature of the `sendMail.js` script, other mailers can easily be
written, allowing additional functionality to be added to this backend app if
needed. In addition to sending an email when guests are invited to a wedding,
other mailers could be used to:

- verify a couple's account upon registration
- send a welcome email thanking the couple for using H3rra
- reset a forgotten password
- notify guests of a new announcement

**The purpose of this doc is to outline how these mailers work and provide
information on how to create a new mailer.**

## Getting Started

Familiarity with the following tech is suggested before modifying or developing new mailers:

- **Nodemailer:** https://nodemailer.com/
- **Ethereal:** https://ethereal.email/
- **SendGrid:** https://sendgrid.com/docs/
- **Handlebars:** https://handlebarsjs.com/guide/

## Folder Structure

All mailers will reside within the `mailer/` directory. In said directory, there
lies the `sendMail.js` script and the mailer folder whose name should describe
what the mailer does (e.g. `sendGuestInvite/` contains the resources needed to
email guests their wedding invite.)

Below is an illustrated example of the `mailer/` folder structure:

```text
mailer/
├── sendWeddingUpdate/      # mailer
├── sendWelcomeEmail/       # mailer
├── sendPasswordReset/      # mailer
├── sendGuestInvite/        # mailer
|   ├── index.js            # email processing script
|   └── guest-invite.hbs    # Handlebars email template
└── sendMail.js             # script called by mailer to send emails
```

## How Mailers Work

First off, a mailer consists of two parts:

- **email processing script:** compiles the email template using the templating
  engine (Handlebars) and passes HTML-compiled email to `sendMail.js` script
- **.hbs email template:** template email with placeholder variables to be
  replaced when compiled

An example of how email templates are compiled then sent is as follows:

1. client app creates new guest via `POST /api/weddings/:weddingId/guest` endpoint
2. once guest resource is created, above endpoint controller calls `sendGuestInvite()`
3. `sendGuestInvite()` opens the email template (`guest-invite.hbs`) and compiles
   to HTML with injected variables
4. aforementioned compiled HTML passed to `sendMail.js` and used in transporter
   to send email
