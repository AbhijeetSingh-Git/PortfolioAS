import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: fromZodError(result.error).message 
        });
      }

      const contactMessage = await storage.createContactMessage(result.data);

      if (process.env.RESEND_API_KEY) {
        try {
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Portfolio Contact <onboarding@resend.dev>",
              to: "abhijeetsinghgautam51@gmail.com",
              subject: `New Contact from ${result.data.name}`,
              html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${result.data.name}</p>
                <p><strong>Email:</strong> ${result.data.email}</p>
                <p><strong>Message:</strong></p>
                <p>${result.data.message}</p>
              `,
            }),
          });
          
          if (!response.ok) {
            console.error("Failed to send email:", await response.text());
          }
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
