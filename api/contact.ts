import { Client } from "pg";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

const createTablesSql = `
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
`;

async function sendEmailViaSendGrid(apiKey: string, to: string, subject: string, html: string) {
  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: process.env.EMAIL_FROM || to },
        subject,
        content: [{ type: "text/html", value: html }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("SendGrid error:", res.status, text);
    }
  } catch (err) {
    console.error("SendGrid send error:", err);
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body: any;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.message });
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    await client.query(createTablesSql);

    const insertSql = `INSERT INTO contact_messages (id, name, email, message) VALUES ($1, $2, $3, $4) RETURNING *`;
    // generate uuid client-side
    const id = cryptoRandomUUID();
    const values = [id, parsed.data.name, parsed.data.email, parsed.data.message];
    const result = await client.query(insertSql, values);
    const row = result.rows[0];

    // optionally send email via SendGrid if key provided
    if (process.env.SENDGRID_API_KEY) {
      const subject = `New Contact from ${parsed.data.name}`;
      const html = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${parsed.data.message}</p>
      `;
      await sendEmailViaSendGrid(process.env.SENDGRID_API_KEY, process.env.EMAIL_TO || parsed.data.email, subject, html);
    }

    return res.status(200).json({ success: true, message: row });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.end().catch(() => {});
  }
}

function cryptoRandomUUID() {
  // Node 16+ has crypto.randomUUID but in some runtimes it may not exist; fallback
  try {
    // @ts-ignore
    return (globalThis.crypto && (globalThis.crypto as any).randomUUID && (globalThis.crypto as any).randomUUID()) || require("crypto").randomUUID();
  } catch (e) {
    const { randomBytes } = require("crypto");
    const bytes = randomBytes(16);
    // set version bits for v4
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map((b: number) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  }
}
