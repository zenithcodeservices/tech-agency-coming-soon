import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, recaptchaToken } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
      
      if (recaptchaSecret) {
        const recaptchaResponse = await fetch(
          `https://www.google.com/recaptcha/api/siteverify`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
          }
        );

        const recaptchaData = await recaptchaResponse.json();

        if (!recaptchaData.success) {
          return NextResponse.json(
            { error: 'reCAPTCHA verification failed' },
            { status: 400 }
          );
        }
      }
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'OPUS Creatives Contact Form <onboarding@resend.dev>', // Update this with your verified domain
      to: ['zenithcodeservices@gmail.com'], // Your email address
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #0000ff 0%, #0066ff 100%);
                color: white;
                padding: 30px 20px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #f9f9f9;
                padding: 30px 20px;
                border: 1px solid #e0e0e0;
                border-top: none;
              }
              .field {
                margin-bottom: 20px;
                background: white;
                padding: 15px;
                border-radius: 6px;
                border-left: 4px solid #0000ff;
              }
              .field-label {
                font-weight: 600;
                font-size: 12px;
                text-transform: uppercase;
                color: #666;
                margin-bottom: 5px;
              }
              .field-value {
                font-size: 16px;
                color: #333;
              }
              .message-field {
                background: white;
                padding: 20px;
                border-radius: 6px;
                border-left: 4px solid #0000ff;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                background: #f9f9f9;
                padding: 20px;
                border: 1px solid #e0e0e0;
                border-top: none;
                border-radius: 0 0 8px 8px;
                text-align: center;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📧 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field-label" style="margin-top: 20px; margin-bottom: 10px;">Message</div>
              <div class="message-field">
                ${message}
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the OPUS Creatives contact form.</p>
              <p>Reply directly to this email to respond to ${name}.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

