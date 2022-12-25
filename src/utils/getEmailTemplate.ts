import { type IFormScheme } from '../types';

const getEmailTemplate = (form: IFormScheme) => {
  const { name, email, message } = form;
  return `<!doctypehtml><html lang="en"><meta charset="UTF-8"><meta content="IE=edge"http-equiv="X-UA-Compatible"><meta content="width=device-width,initial-scale=1"name="viewport"><title>Contact Form</title><meta content="Contact Form"property="og:title"><style>a{text-decoration:underline;color:inherit;font-weight:700;color:#253342}h1{font-size:48px}h2{font-size:24px;font-weight:900}p{font-weight:100}td{vertical-align:top}#email{margin:auto;width:600px;background-color:#fff}</style><body bgcolor="#F5F8FA"style="width:100%;margin:auto 0;padding:0;font-family:Lato,sans-serif;font-size:18px;color:#33475b;word-break:break-word"><div id="email"><table role="presentation"bgcolor="#00A4BD"width="100%"><tr><td align="center"style="color:#fff"><h1>Contact Form</h1></table><table role="presentation"style="padding:30px 30px 30px 60px"border="0"cellpadding="0"cellspacing="10px"><tr><td><h2>Name</h2><p>${name}<tr><td><h2>Email</h2><p>${email}<tr><td><h2>Message</h2><p>${message}</table><table role="presentation"bgcolor="#EAF0F6"width="100%"style="margin-top:50px"><tr><td align="center"style="padding:30px 30px"><h2>Contact Form</h2><p>This message was sent from the contact form on your <a href="https://emrebal.com"target="_blank">website</a>.</table></div>`;
};

export default getEmailTemplate;
