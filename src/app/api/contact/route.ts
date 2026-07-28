import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('RESEND_API_KEY is missing in environment variables.');
      return NextResponse.json({
        success: false,
        message: 'RESEND_API_KEY is missing. Please check your .env.local file.',
      }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { name, email, project_focus, details, type, bookingDate, bookingTime } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, message: 'Name and Email are required.' }, { status: 400 });
    }

    const isBooking = type === 'booking';
    const subject = isBooking
      ? `📅 Diagnostic Call Booking: ${name}`
      : `🚀 New Project Brief: ${name} (${project_focus || 'General'})`;

    const htmlContent = isBooking
      ? `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #111; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #1b929a; border-bottom: 2px solid #1b929a; padding-bottom: 10px; margin-top: 0;">New Diagnostic Call Booking</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Requested Date:</strong> ${bookingDate || 'N/A'}</p>
          <p><strong>Requested Time:</strong> ${bookingTime || 'N/A'} (EST)</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 0.8rem; color: #888;">Sent from Codnexa Diagnostic Booking System.</p>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #111; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #1b929a; border-bottom: 2px solid #1b929a; padding-bottom: 10px; margin-top: 0;">New Project Brief Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Project Focus:</strong> ${project_focus || 'Not specified'}</p>
          <p><strong>Brief Details:</strong></p>
          <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; white-space: pre-wrap; border: 1px solid #e9ecef;">${details || 'No details provided.'}</div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 0.8rem; color: #888;">Sent from Codnexa Project Brief Form.</p>
        </div>
      `;

    const data = await resend.emails.send({
      from: 'Codnexa <onboarding@resend.dev>',
      to: ['codnexa@gmail.com'],
      replyTo: email,
      subject: subject,
      html: htmlContent,
    });

    if (data.error) {
      return NextResponse.json({ success: false, message: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
