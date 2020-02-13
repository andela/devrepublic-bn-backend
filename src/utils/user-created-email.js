import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.sendgridKey);
const hostUrl = process.env.BASE_URL;

const sendMsg = (newUserEmail, token, firstName) => {
  const msg = {
    to: newUserEmail,
    from: 'devrepublic.team@gmail.com',
    subject: 'Welcome to devRepublic BareFoot Nomad API',
    html: `
      Hi ${firstName},
      <br>
      <br>
      We are excited have you as part of our family. On behalf of devRepublic,
      we welcome you, and hope you find our service useful.
      <br>
      Click on this link below to verify your account.
      <br>
      <br>
      ${hostUrl}/api/v1/auth/verification?token=${token}&email=${newUserEmail}
      <br>
      <br>
      Regards,
      <br>
      <strong>devRepublic Team<strong>`
  };

  sgMail.send(msg);
};

export default sendMsg;
