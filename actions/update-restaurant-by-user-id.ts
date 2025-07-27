"use server";

import { auth } from "@clerk/nextjs/server";
import { uploadToCloudinary } from "./upload-to-cloudinary";

export async function updateRestaurantByUserId(
  data: Record<string, any>,
  logoFile?: File
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  let updateData = { ...data };

  // Handle logo upload if a file is provided
  if (logoFile) {
    try {
      const formData = new FormData();
      formData.append("file", logoFile);

      const logoUrl = await uploadToCloudinary(formData);
      updateData.logo_url = logoUrl;
    } catch (error) {
      console.error("Logo upload failed:", error);
      throw new Error("Failed to upload logo");
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to update restaurant");
  }

  return await res.json();
}
