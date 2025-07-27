import { createRestaurant } from "@/actions/create-restaurant";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    if (evt.type === "user.created") {
      const restaurant = await createRestaurant({ owner_id: evt.data.id });

      if (restaurant) {
        console.log("Restaurant created:", restaurant);
      } else {
        console.error("Failed to create restaurant");
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
