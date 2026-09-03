import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const resend = new Resend(apiKey);
    const { name, email, message } = req.body;

    // Strict validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Trim and enforce reasonable limits
    const trimmedName = name.trim().slice(0, 100);
    const trimmedEmail = email.trim().slice(0, 100);
    const trimmedMessage = message.trim().slice(0, 5000);

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: ['raju.praneshkumar@gmail.com'],
      replyTo: trimmedEmail,
      subject: `New Portfolio Message from ${trimmedName}`,
      text: `Name:\n${trimmedName}\n\nEmail:\n${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
