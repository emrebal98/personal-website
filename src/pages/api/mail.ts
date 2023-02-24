import { type NextApiRequest, type NextApiResponse } from 'next/types';
import { ZodError } from 'zod';
// eslint-disable-next-line import/extensions
import { env } from '../../env/server.mjs';
import { getEmailTemplate, validateForm } from '../../utils';

export default async function sendContactForm(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Validate form data
    const formData = validateForm(req.body);
    // Create body for mail API
    const body = JSON.stringify({
      sender: {
        name: 'Emre Bal',
        email: env.MAIL_FROM,
      },
      to: [
        {
          name: 'Emre Bal - Contact',
          email: env.MAIL_TO,
        },
      ],
      subject: 'Contact Form',
      htmlContent: getEmailTemplate(formData),
    });
    // Send email
    const response = await fetch(env.MAIL_API, {
      method: 'POST',
      headers: { 'api-key': env.MAIL_API_KEY, 'Content-Type': 'application/json' },
      body,
    });
    // Check response
    if (!response.ok) return res.status(500).json({ error: 'Something went wrong.' });
  } catch (error) {
    if (error instanceof ZodError) {
      // Zod validation errors
      const errors = error.issues.map((issue) => issue.message).join(', ');
      return res.status(500).json({ error: errors });
    }
    // Other errors
    return res.status(500).json({ error: 'Something went wrong.' });
  }
  // Success
  return res.status(200).json({ error: '' });
}
