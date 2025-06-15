interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from = "no-reply@indicjourneys.com" }: EmailOptions) {
  // Check if Resend API key is available
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable")
    return { error: "Email service not configured" }
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to send email")
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error sending email:", error)
    return { error: "Failed to send email" }
  }
}

// Named export for the contact email function
export async function sendContactEmail(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  tourType?: string
  travelers?: number
  destination?: string
  message: string
}) {
  const { firstName, lastName, email, phone, tourType, travelers, destination, message } = data

  const subject = `New Contact Form Submission from ${firstName} ${lastName}`

  const html = `
    <h1>New Contact Form Submission</h1>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
    ${tourType ? `<p><strong>Tour Type:</strong> ${tourType}</p>` : ""}
    ${travelers ? `<p><strong>Number of Travelers:</strong> ${travelers}</p>` : ""}
    ${destination ? `<p><strong>Destination:</strong> ${destination}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `

  // Send to admin email
  return sendEmail({
    to: process.env.ADMIN_EMAIL || "info@indicjourneys.com",
    subject,
    html,
  })
}

export function generateContactFormEmail(formData: {
  name: string
  email: string
  message: string
  phone?: string
}) {
  const { name, email, message, phone } = formData

  return {
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  }
}

export function generateBookingConfirmationEmail(bookingData: {
  name: string
  tourName: string
  date: string
  participants: number
}) {
  const { name, tourName, date, participants } = bookingData

  return {
    subject: `Booking Confirmation: ${tourName}`,
    html: `
      <h1>Your Booking is Confirmed!</h1>
      <p>Dear ${name},</p>
      <p>Thank you for booking with Indic Journeys. Your tour has been confirmed.</p>
      <p><strong>Tour:</strong> ${tourName}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Participants:</strong> ${participants}</p>
      <p>We will contact you shortly with more details.</p>
      <p>Best regards,<br>Indic Journeys Team</p>
    `,
  }
}

// Add a module export object with all the functions for better compatibility
const emailService = {
  sendEmail,
  sendContactEmail,
  generateContactFormEmail,
  generateBookingConfirmationEmail
};

export default emailService;
