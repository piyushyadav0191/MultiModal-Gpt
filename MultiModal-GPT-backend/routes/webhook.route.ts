import { Router } from "express";
import type { Request, Response } from "express";
import { prisma } from "../app";
import { Webhook } from "svix";

const webhookRouter = Router();

interface WebhookEvent {
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    image_url?: string;
    username?: string;
  };
  type: string;
}
// @ts-ignore
webhookRouter.post("/webhook", async (req: Request, res: Response) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return res.status(500).json({
      error: "Please add WEBHOOK_SECRET from Clerk Dashboard to .env",
    });
  }

  // Get the headers and body
  const headers = req.headers;
  const body = JSON.stringify(req.body);

  // Get the Svix headers for verification
  const svix_id = headers["svix-id"] as string;
  const svix_timestamp = headers["svix-timestamp"] as string;
  const svix_signature = headers["svix-signature"] as string;

  // If there are no Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).json({ error: "Error occurred" });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  try {
    if (eventType === "user.created") {
      const { email_addresses, image_url, username } = evt.data;
      const userData = {
        clerkId: id,
        email:
          email_addresses && email_addresses.length > 0
            ? email_addresses[0].email_address
            : "",
        username: username || null,
        image_url: image_url,
      };

      // Create a new user using Prisma
      const newUser = await prisma.user.create({
        data: userData,
      });
      return res.json({ message: "OK", user: newUser });
    }

    if (eventType === "user.updated") {
      const { image_url, username } = evt.data;

      const updatedUser = await prisma.user.update({
        where: { clerkId: id },
        data: {
          username: username || null,
          image_url: image_url,
        },
      });

      return res.json({ message: "OK", user: updatedUser });
    }

    if (eventType === "user.deleted") {
      await prisma.user.delete({
        where: { clerkId: id },
      });

      return res.json({ message: "OK", userId: id });
    }
  } catch (error) {
    console.error(`Error handling ${eventType} event:`, error);
    return res.status(500).json({ error: `Error handling ${eventType} event` });
  }

  return res.status(200).json({ message: "success" });
});

export default webhookRouter;
