import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return transporter.sendMail({
    from: `"SRI DURGAPARAMESHWARI TOURIST" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html,
  });
}

// ── Email Templates ───────────────────────────────────────────────────────────

export function adminBookingNotificationHtml(booking: {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  dateTime: Date;
  passengers: number;
  tripType: string;
  phoneNumber: string;
  email?: string | null;
  specialInstructions?: string | null;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"><title>New Booking</title></head>
  <body style="font-family:sans-serif;background:#0a0a0a;color:#f1f1f1;padding:0;margin:0;">
    <div style="max-width:600px;margin:40px auto;background:#111;border-radius:16px;overflow:hidden;border:1px solid #222;">
      <div style="background:linear-gradient(135deg,#f59e0b,#fbbf24);padding:30px 40px;">
        <h1 style="margin:0;color:#000;font-size:24px;">🚗 New Booking Received</h1>
        <p style="margin:8px 0 0;color:#000;opacity:0.8;">Sri Durgaparameshwari Tourist</p>
      </div>
      <div style="padding:30px 40px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row("Booking ID", booking.id.slice(-8).toUpperCase())}
          ${row("Pickup", booking.pickupLocation)}
          ${row("Drop", booking.dropLocation)}
          ${row("Date & Time", new Date(booking.dateTime).toLocaleString("en-IN"))}
          ${row("Passengers", String(booking.passengers))}
          ${row("Trip Type", booking.tripType)}
          ${row("Phone", booking.phoneNumber)}
          ${booking.email ? row("Email", booking.email) : ""}
          ${booking.specialInstructions ? row("Instructions", booking.specialInstructions) : ""}
        </table>
        <div style="margin-top:30px;padding:16px;background:#1a1a1a;border-radius:10px;border-left:4px solid #f59e0b;">
          <p style="margin:0;color:#f59e0b;font-weight:bold;">Login to admin panel to confirm this booking and set the price.</p>
        </div>
      </div>
    </div>
  </body>
  </html>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #222;color:#888;width:40%">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #222;color:#fff;font-weight:600">${value}</td>
  </tr>`;
}

export function customerConfirmationHtml(booking: {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  dateTime: Date;
  passengers: number;
  tripType: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"><title>Booking Confirmation</title></head>
  <body style="font-family:sans-serif;background:#0a0a0a;color:#f1f1f1;padding:0;margin:0;">
    <div style="max-width:600px;margin:40px auto;background:#111;border-radius:16px;overflow:hidden;border:1px solid #222;">
      <div style="background:linear-gradient(135deg,#f59e0b,#fbbf24);padding:30px 40px;">
        <h1 style="margin:0;color:#000;font-size:24px;">✅ Booking Confirmed!</h1>
        <p style="margin:8px 0 0;color:#000;opacity:0.8;">Sri Durgaparameshwari Tourist</p>
      </div>
      <div style="padding:30px 40px;">
        <p style="color:#ccc;margin-bottom:24px;">Thank you for choosing us! Your booking has been received. We will contact you shortly to confirm details.</p>
        <table style="width:100%;border-collapse:collapse;">
          ${row("Booking Ref", booking.id.slice(-8).toUpperCase())}
          ${row("From", booking.pickupLocation)}
          ${row("To", booking.dropLocation)}
          ${row("Date & Time", new Date(booking.dateTime).toLocaleString("en-IN"))}
          ${row("Passengers", String(booking.passengers))}
          ${row("Trip Type", booking.tripType)}
        </table>
        <div style="margin-top:30px;display:flex;gap:12px;">
          <a href="tel:+919663953589" style="background:#f59e0b;color:#000;padding:14px 24px;border-radius:50px;text-decoration:none;font-weight:bold;display:inline-block;">📞 Call: 9663953589</a>
          <a href="https://wa.me/919663953589" style="background:#25D366;color:#fff;padding:14px 24px;border-radius:50px;text-decoration:none;font-weight:bold;display:inline-block;">💬 WhatsApp</a>
        </div>
        <p style="margin-top:24px;color:#888;font-size:13px;">Driven by Experience. Trusted for Every Journey. — Gunesh Raju Shetty</p>
      </div>
    </div>
  </body>
  </html>`;
}

export function contactNotificationHtml(msg: {
  name: string;
  phone: string;
  email?: string | null;
  message: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family:sans-serif;background:#0a0a0a;padding:40px;">
    <div style="max-width:560px;margin:0 auto;background:#111;border-radius:16px;overflow:hidden;border:1px solid #222;">
      <div style="background:linear-gradient(135deg,#f59e0b,#fbbf24);padding:24px 32px;">
        <h2 style="margin:0;color:#000;">📩 New Contact Message</h2>
      </div>
      <div style="padding:28px 32px;">
        <p><strong style="color:#f59e0b">Name:</strong> <span style="color:#fff">${msg.name}</span></p>
        <p><strong style="color:#f59e0b">Phone:</strong> <span style="color:#fff">${msg.phone}</span></p>
        ${msg.email ? `<p><strong style="color:#f59e0b">Email:</strong> <span style="color:#fff">${msg.email}</span></p>` : ""}
        <p><strong style="color:#f59e0b">Message:</strong></p>
        <div style="background:#1a1a1a;padding:16px;border-radius:8px;color:#ccc;">${msg.message}</div>
      </div>
    </div>
  </body>
  </html>`;
}
