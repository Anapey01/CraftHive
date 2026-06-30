'use server';

import { Resend } from 'resend';

export async function sendContactEmail(formData: FormData) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const attachment = formData.get('attachment') as File;

    // Validate required fields
    if (!name || !phone || !email || !message) {
      return {
        success: false,
        error: 'Please fill in all required fields',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address',
      };
    }

    // Handle file attachment if present
    let attachmentBuffer = null;
    let attachmentFilename = null;
    let attachmentType = null;

    if (attachment && attachment.size > 0) {
      // Check file size (max 5MB)
      if (attachment.size > 5 * 1024 * 1024) {
        return {
          success: false,
          error: 'File size must be less than 5MB',
        };
      }

      const bytes = await attachment.arrayBuffer();
      attachmentBuffer = Buffer.from(bytes);
      attachmentFilename = attachment.name;
      attachmentType = attachment.type;
    }

    // Send email using Resend
    const emailData: any = {
      from: 'onboarding@resend.dev', 
      replyTo: email,
      to: ['info@crafthivegh.com'],
      subject: `New Enquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #671b12; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 20px; background: #f9f9f9; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0; }
            .label { font-weight: bold; color: #671b12; margin-bottom: 5px; display: inline-block; }
            .value { color: #333; margin-top: 5px; }
            .message { background: white; padding: 15px; border-left: 4px solid #671b12; margin-top: 10px; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .badge { display: inline-block; background: #671b12; color: white; padding: 2px 8px; border-radius: 4px; font-size: 10px; margin-left: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">✨ New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">📝 Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📞 Phone:</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">✉️ Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="message">${message.replace(/\n/g, '<br/>')}</div>
              </div>
              ${attachmentFilename ? `
              <div class="field">
                <div class="label">📎 Attachment:</div>
                <div class="value">${attachmentFilename} <span class="badge">sent as base64</span></div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p><strong>💡 Tip:</strong> Reply directly to this email to respond to ${name}</p>
              <p style="margin-top: 10px;">This message was sent from your website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Add attachment if present
    if (attachmentBuffer && attachmentFilename) {
      emailData.attachments = [
        {
          filename: attachmentFilename,
          content: attachmentBuffer.toString('base64'),
        },
      ];
    }

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email. Please try again.',
      };
    }

    return {
      success: true,
      message: 'Your enquiry has been sent successfully! We\'ll respond within 24 hours.',
      data,
    };
  } catch (error) {
    console.error('Server error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}