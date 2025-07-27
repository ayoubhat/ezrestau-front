"use server";

interface CreateRestaurantData {
  owner_id: string;
}

interface RestaurantResponse {
  id: string;
  userId: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createRestaurant(
  data: CreateRestaurantData
): Promise<RestaurantResponse | null> {
  try {
    const response = await fetch(`${API_URL}/restaurants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const restaurant = await response.json();
    return restaurant;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return null;
  }
}
