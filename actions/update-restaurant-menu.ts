"use server";

import { uploadToCloudinary } from "./upload-to-cloudinary";
import { MenuCategory, MenuItem } from "./get-restaurant-by-id";
import { auth } from "@clerk/nextjs/server";

export async function addCategoryToRestaurant(categoryName: string) {
  // ✅ Move auth() inside the function
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // First get the current restaurant data
  const restaurant = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`
  );

  if (!restaurant.ok) {
    throw new Error("Failed to fetch restaurant");
  }

  const restaurantData = await restaurant.json();
  const currentMenu = restaurantData.menu || [];

  // Check if category already exists
  const categoryExists = currentMenu.some(
    (cat: MenuCategory) =>
      cat.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (categoryExists) {
    throw new Error("Cette catégorie existe déjà");
  }

  // Add new category
  const newCategory: MenuCategory = {
    category: categoryName,
    items: [],
  };

  const updatedMenu = [...currentMenu, newCategory];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menu: updatedMenu }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to add category");
  }

  return await res.json();
}

export async function addItemToCategory(
  categoryName: string,
  itemData: Omit<MenuItem, "image_url">,
  imageFile?: File
) {
  // ✅ Add auth() inside this function too
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  let finalItemData: Omit<MenuItem, "image_url"> & { image_url?: string } = {
    ...itemData,
  };

  // Handle image upload if a file is provided
  if (imageFile) {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const imageUrl = await uploadToCloudinary(formData);
      finalItemData.image_url = imageUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Failed to upload image");
    }
  }

  // Get current restaurant data
  const restaurant = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`
  );

  if (!restaurant.ok) {
    throw new Error("Failed to fetch restaurant");
  }

  const restaurantData = await restaurant.json();
  const currentMenu = restaurantData.menu || [];

  // Find the category and add the item
  const updatedMenu = currentMenu.map((category: MenuCategory) => {
    if (category.category === categoryName) {
      return {
        ...category,
        items: [...category.items, finalItemData],
      };
    }
    return category;
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menu: updatedMenu }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to add menu item");
  }

  return await res.json();
}

export async function updateMenuItem(
  categoryName: string,
  itemIndex: number,
  itemData: Omit<MenuItem, "image_url">,
  imageFile?: File
) {
  // ✅ Add auth() inside this function too
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  let finalItemData: Omit<MenuItem, "image_url"> & { image_url?: string } = {
    ...itemData,
  };

  // Handle image upload if a file is provided
  if (imageFile) {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const imageUrl = await uploadToCloudinary(formData);
      finalItemData.image_url = imageUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Failed to upload image");
    }
  }

  // Get current restaurant data
  const restaurant = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`
  );

  if (!restaurant.ok) {
    throw new Error("Failed to fetch restaurant");
  }

  const restaurantData = await restaurant.json();
  const currentMenu = restaurantData.menu || [];

  // Update the specific item
  const updatedMenu = currentMenu.map((category: MenuCategory) => {
    if (category.category === categoryName) {
      const updatedItems = [...category.items];
      updatedItems[itemIndex] = finalItemData;
      return {
        ...category,
        items: updatedItems,
      };
    }
    return category;
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menu: updatedMenu }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update menu item");
  }

  return await res.json();
}

export async function deleteMenuItem(categoryName: string, itemIndex: number) {
  // ✅ Add auth() inside this function too
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Get current restaurant data
  const restaurant = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`
  );

  if (!restaurant.ok) {
    throw new Error("Failed to fetch restaurant");
  }

  const restaurantData = await restaurant.json();
  const currentMenu = restaurantData.menu || [];

  // Remove the specific item
  const updatedMenu = currentMenu.map((category: MenuCategory) => {
    if (category.category === categoryName) {
      const updatedItems = category.items.filter(
        (_, index) => index !== itemIndex
      );
      return {
        ...category,
        items: updatedItems,
      };
    }
    return category;
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menu: updatedMenu }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete menu item");
  }

  return await res.json();
}

export async function deleteCategoryFromRestaurant(categoryName: string) {
  // ✅ Add auth() inside this function too
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Get current restaurant data
  const restaurant = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`
  );

  if (!restaurant.ok) {
    throw new Error("Failed to fetch restaurant");
  }

  const restaurantData = await restaurant.json();
  const currentMenu = restaurantData.menu || [];

  // Remove the category
  const updatedMenu = currentMenu.filter(
    (category: MenuCategory) => category.category !== categoryName
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/user/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menu: updatedMenu }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete category");
  }

  return await res.json();
}
