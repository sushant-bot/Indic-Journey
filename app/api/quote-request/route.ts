import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Parse the request body
    const data = await request.json();
    const { name, email, phone, tour_type, destination, travel_dates, group_size, budget, message } = data;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Format the WhatsApp message
    const whatsappMessage = encodeURIComponent(`
*New Tour Quote Request*
---------------------
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone || 'Not provided'}
*Tour Type:* ${tour_type || 'Not specified'}
*Destination:* ${destination || 'Not specified'}
*Travel Dates:* ${travel_dates || 'Not specified'}
*Group Size:* ${group_size || 'Not specified'}
*Budget:* ${budget || 'Not specified'}
*Message:* ${message || 'No additional message'}
    `);

    // Prepare WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919371131975&text=${whatsappMessage}`;    // Send email using Resend
    let emailResult;
    try {
      emailResult = await resend.emails.send({
        from: 'Indic Journey <quote-requests@indicjourney.com>',
        to: ['admin@indicjourney.com'],
        subject: `New Tour Quote Request from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #d97706; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">New Tour Quote Request</h2>
            
            <div style="margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Tour Type:</strong> ${tour_type || 'Not specified'}</p>
              <p><strong>Destination:</strong> ${destination || 'Not specified'}</p>
              <p><strong>Travel Dates:</strong> ${travel_dates || 'Not specified'}</p>
              <p><strong>Group Size:</strong> ${group_size || 'Not specified'}</p>
              <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            </div>
            
            <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <strong>Message:</strong>
              <p>${message || 'No additional message'}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #6b7280;">
              <p>This inquiry was submitted from the Indic Journey website on ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue execution even if email fails
      emailResult = { error: true, message: 'Failed to send email but WhatsApp option is available' };
    }

    // Return success response with links
    return NextResponse.json({ 
      success: true, 
      message: 'Quote request submitted successfully',
      whatsappUrl,
      emailResult
    });
    
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json({ error: 'Failed to process quote request' }, { status: 500 });
  }
}
