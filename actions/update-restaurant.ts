"use server";

import { uploadToCloudinary } from "./upload-to-cloudinary";

export async function updateRestaurant(
  id: string,
  data: Record<string, unknown>,
  logoFile?: File
) {
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
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update restaurant");
  }

  return await res.json();
}
