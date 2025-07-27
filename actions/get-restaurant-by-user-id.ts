"use server";

import { auth } from "@clerk/nextjs/server";

export async function getRestaurantByUserId(userId: string) {
  const { userId: authUserId } = await auth();

  // Ensure user can only access their own restaurant
  if (authUserId !== userId) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return null; // No restaurant found for user
    }
    throw new Error("Failed to fetch restaurant");
  }

  return await response.json();
}
