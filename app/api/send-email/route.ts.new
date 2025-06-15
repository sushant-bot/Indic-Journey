import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

// Email address where requests will be sent
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yourdomain.com'; // Uses environment variable with fallback
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'info@yourdomain.com'; // Uses environment variable with fallback

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON request body
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Determine the type of request
    const requestType = formData.tourType || 'General Inquiry';
    const isBooking = requestType.toLowerCase().includes('booking');
    
    // Set subject based on request type
    const subject = isBooking 
      ? `New Booking Request from ${formData.name}`
      : `New Inquiry from ${formData.name} - ${requestType}`;

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #ff6b00; }
            .info-item { margin-bottom: 10px; }
            .label { font-weight: bold; }
            .message-box { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px; }
            .header-image { width: 100%; max-height: 150px; object-fit: cover; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${isBooking ? 'New Booking Request' : 'New Inquiry'}</h1>
            <p>A new ${isBooking ? 'booking request' : 'inquiry'} has been submitted with the following details:</p>
            
            <div class="info-item"><span class="label">Name:</span> ${formData.name}</div>
            <div class="info-item"><span class="label">Email:</span> ${formData.email}</div>
            <div class="info-item"><span class="label">Phone:</span> ${formData.phone || 'Not provided'}</div>
            ${formData.tourType ? `<div class="info-item"><span class="label">Type:</span> ${formData.tourType}</div>` : ''}
            <div class="info-item"><span class="label">Destination:</span> ${formData.destination || 'Not specified'}</div>
            <div class="info-item"><span class="label">Number of Travelers:</span> ${formData.travelers || 'Not specified'}</div>
            <div class="info-item"><span class="label">Duration:</span> ${formData.duration || 'Not specified'}</div>
            
            ${formData.message ? `
              <div class="message-box">
                <p class="label">Additional Information:</p>
                <p>${formData.message.replace(/\n/g, '<br>')}</p>
              </div>
            ` : ''}
            
            <p>Please respond to this ${isBooking ? 'booking request' : 'inquiry'} as soon as possible.</p>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `Indic Journeys <${COMPANY_EMAIL}>`, // Replace with your verified domain
      to: [ADMIN_EMAIL],
      subject: subject,
      html: htmlContent,
      replyTo: formData.email
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
