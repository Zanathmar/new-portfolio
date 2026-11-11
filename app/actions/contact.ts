'use server';

interface SendContactEmailParams {
  name: string;
  email: string;
  message: string;
  website?: string;
}

interface SendContactEmailResult {
  success: boolean;
  message: string;
}

export async function sendContactEmail(
  data: SendContactEmailParams
): Promise<SendContactEmailResult> {
  const { name, email, message, website } = data;

  // 1. Honeypot check: Bots fill hidden inputs automatically
  if (website && website.trim().length > 0) {
    // Return success silently to discard bot traffic without burning quota
    return { success: true, message: 'Message sent successfully!' };
  }

  // 2. Server-side validation
  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanMessage = (message || '').trim();

  if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
    return { success: false, message: 'Please provide a valid name (2–100 characters).' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail) || cleanEmail.length > 254) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  if (!cleanMessage || cleanMessage.length < 5 || cleanMessage.length > 5000) {
    return { success: false, message: 'Please enter a message between 5 and 5,000 characters.' };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || 'izzanathmar.m@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  // In development without an API key, log to console and succeed gracefully
  if (!resendApiKey) {
    console.warn(
      '[Contact Action] RESEND_API_KEY is not configured. Simulating email dispatch:\n' +
      JSON.stringify({ to: toEmail, from: fromEmail, name: cleanName, email: cleanEmail, message: cleanMessage }, null, 2)
    );
    return {
      success: true,
      message: 'Message sent successfully! (Preview mode: add RESEND_API_KEY in .env.local for live delivery)',
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: cleanEmail,
        headers: {
          'Reply-To': cleanEmail,
        },
        subject: `New Portfolio Message from ${cleanName}`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 2px solid #000; border-radius: 12px; background: #fff;">
            <h2 style="margin-top: 0; color: #000; border-bottom: 2px solid #000; padding-bottom: 12px;">New Contact Form Message</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${cleanName}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
            <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px; border-left: 4px solid #000;">
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #1a1a1a;">${cleanMessage}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[Contact Action] Resend API error:', errorData);
      return {
        success: false,
        message: errorData.message || 'Failed to send message via Resend. Please try again.',
      };
    }

    return {
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
    };
  } catch (error) {
    console.error('[Contact Action] Unexpected error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again or email directly.',
    };
  }
}
