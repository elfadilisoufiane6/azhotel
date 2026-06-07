import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = env.SMTP_HOST
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ?? 587,
      secure: false,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS! } : undefined,
    })
  : null;

export async function sendMail(opts: { to: string; subject: string; html: string; text?: string }) {
  if (!transporter) {
    console.log(`📭 [dev] would have emailed ${opts.to}: ${opts.subject}`);
    return { messageId: "dev-noop" };
  }
  return transporter.sendMail({
    from: env.MAIL_FROM,
    ...opts,
  });
}

export async function sendBookingConfirmation(p: {
  to: string;
  reference: string;
  firstName: string;
  checkIn: string;
  checkOut: string;
}) {
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;max-width:560px;margin:auto">
      <h1 style="font-family:'Cormorant Garamond',serif;color:#0A2540">Reservation confirmed</h1>
      <p>Dear ${p.firstName},</p>
      <p>Thank you for choosing AZ Hôtel des Arts. Your stay is confirmed.</p>
      <table style="border-collapse:collapse;width:100%;margin:24px 0">
        <tr><td style="padding:8px 0;color:#666">Reference</td>
            <td style="padding:8px 0;color:#C9A14A"><strong>${p.reference}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666">Check-in</td>
            <td style="padding:8px 0">${p.checkIn}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Check-out</td>
            <td style="padding:8px 0">${p.checkOut}</td></tr>
      </table>
      <p>We look forward to welcoming you to Rabat.</p>
      <p style="color:#666;font-size:12px">AZ Hôtel des Arts · Avenue Mohammed V · Rabat · Morocco</p>
    </div>`;
  return sendMail({
    to: p.to,
    subject: `Your AZ Hôtel des Arts reservation — ${p.reference}`,
    html,
  });
}
