// mailgun email services will be handled from here
const apiKey = 'key-c0f597a42e8511240594979a8d418c42';
const domain = 'sandbox9dadc6e207204144890dc7857c038f9d.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey, domain });


exports.sendEmailVerification = (email, token) => {
  const verificationLink = `http://localhost:8089/verify/${token}`;
  const message = {
    from: 'uAuthJWTwMailV <postmaster@sandbox9dadc6e207204144890dc7857c038f9d.mailgun.org>',
    to: email,
    subject: 'Please verify your account',
    text: `Please click on the link below to verify your account ${verificationLink}`
  };

  mailgun.messages().send(message, (error, body) => {
    if (error) {
      return error;
    }

    return body;
  });
};
