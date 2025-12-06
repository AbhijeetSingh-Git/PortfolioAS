import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Initialize nodemailer transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).message 
        });
      }

      const contactMessage = await storage.createContactMessage(result.data);

      // Send email using Nodemailer if credentials are set
      if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        try {
          await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: "abhijeetsinghgautam51@gmail.com",
            subject: `New Contact from ${result.data.name}`,
            html: `
              <h2>New Contact Message</h2>
              <p><strong>Name:</strong> ${result.data.name}</p>
              <p><strong>Email:</strong> ${result.data.email}</p>
              <p><strong>Message:</strong></p>
              <p>${result.data.message}</p>
            `,
          });
          console.log(`Email sent to abhijeetsinghgautam51@gmail.com from ${result.data.email}`);
        } catch (emailError) {
          console.error("Email sending error:", emailError);
        }
      }

      res.json({ success: true, message: contactMessage });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to submit message" });
    }
  });

  return httpServer;
}
