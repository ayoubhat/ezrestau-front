"use server";

import { Restaurant } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRestaurantById(id: string): Promise<Restaurant> {
  const response = await fetch(`${API_URL}/restaurants/${id}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch restaurant: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
