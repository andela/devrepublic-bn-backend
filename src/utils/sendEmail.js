import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import mailgen from 'mailgen';

dotenv.config();

sgMail.setApiKey(process.env.sendgridKey);
const mailGenerator = new mailgen({
  theme: 'salted',
  product: {
    name: 'barefoot nomad',
    link: 'barefoot nomad'
  }
});
const sendMsg = (newUserEmail, firstName, content, link) => {
  const email = mailGenerator.generate({
    body: {
      name: firstName,
      intro: content.intro,
      signature: content.signature,
      action: {
        instructions: content.instruction,
        button: {
          color: '#22bc66',
          text: content.text,
          link
        }
      }
    }
  });
  const msg = {
    to: newUserEmail,
    from: 'devrepublic.team@gmail.com',
    subject: 'barefoot nomad',
    html: email
  };

  sgMail.send(msg);
};


export default sendMsg;
