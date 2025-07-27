import { Restaurant } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRestaurantBySubdomain(
  subdomain: string
): Promise<Restaurant> {
  const response = await fetch(`${API_URL}/restaurants/subdomain/${subdomain}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch restaurant: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
