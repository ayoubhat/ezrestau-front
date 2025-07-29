"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CategoryModal from "./CategoryModal";
import MenuItemModal from "./MenuItemModal";
import EditMenuItemModal from "./EditMenuItemModal";
import DeleteMenuItemDialog from "./DeleteMenuItemDialog";
import PageHeader from "../_components/PageHeader";
import { useUser } from "@clerk/nextjs";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import emptyMenuImg from "@/public/empty-state-menu.svg";
import Image from "next/image";
import TipCard from "@/components/TipCard";
import { MenuCategory, MenuItem } from "@/types";

interface EditingItem {
  item: MenuItem;
  categoryName: string;
  itemIndex: number;
}

interface DeletingItem {
  item: MenuItem;
  categoryName: string;
  itemIndex: number;
}

const MenuManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<DeletingItem | null>(null);

  const { user, isLoaded } = useUser();
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });
  const categories = restaurant?.menu || [];

  // Filter items based on search query
  const filteredCategories = categories
    .map((category: MenuCategory) => ({
      ...category,
      items: category.items.filter(
        (item: MenuItem) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(
      (category: MenuCategory) => !searchQuery || category.items.length > 0
    );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const handleEditItem = (
    item: MenuItem,
    categoryName: string,
    itemIndex: number
  ) => {
    setEditingItem({ item, categoryName, itemIndex });
  };

  const handleDeleteItem = (
    item: MenuItem,
    categoryName: string,
    itemIndex: number
  ) => {
    setDeletingItem({ item, categoryName, itemIndex });
  };

  if (isLoading || !isLoaded) {
    return (
      <div className="space-y-4">
        <PageHeader
          title="La carte"
          description="Gérez vos produits et catégories"
        />
        <p> Chargement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="La carte"
        description="Gérez vos produits et catégories"
      />
      <TipCard>
        <p>
          Organisez votre menu en créant d&apos;abord des catégories (Pizzas,
          Plats, Desserts...), puis ajoutez vos plats dans chaque catégorie.
        </p>
      </TipCard>

      <div className="flex justify-between gap-2 flex-wrap-reverse sm:flex-nowrap md:gap-2 felx-wrap">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher des plats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <CategoryModal />
          <MenuItemModal categories={categories} />
        </div>
      </div>

      {/* Menu items grouped by category */}
      <div className="space-y-4">
        {filteredCategories.map(
          (category: MenuCategory, categoryIndex: number) => {
            const isExpanded = expandedCategories[category.category] ?? true;

            return (
              <div
                key={categoryIndex}
                className="border rounded-lg overflow-hidden"
              >
                <div
                  className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleCategory(category.category)}
                >
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-lg">{category.category}</h3>
                    <Badge variant="secondary">
                      {category.items.length}{" "}
                      {category.items.length === 1 ? "item" : "items"}
                    </Badge>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>

                {isExpanded && (
                  <div className="divide-y">
                    {category.items.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        Aucun plat dans cette catégorie
                      </div>
                    ) : (
                      category.items.map(
                        (item: MenuItem, itemIndex: number) => (
                          <div
                            key={itemIndex}
                            className="p-4 flex items-center gap-4 hover:bg-gray-50"
                          >
                            {/* Item image */}
                            <div className="w-16 h-16 flex-shrink-0">
                              {item.image_url ? (
                                <Image
                                  src={item.image_url}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">
                                    Pas d&apos;image
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Item details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  {item.description && (
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 ml-4">
                                  <span className="font-semibold text-lg">
                                    {formatPrice(item.price)}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-600 hover:text-blue-800"
                                      onClick={() =>
                                        handleEditItem(
                                          item,
                                          category.category,
                                          itemIndex
                                        )
                                      }
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-600 hover:text-red-800"
                                      onClick={() =>
                                        handleDeleteItem(
                                          item,
                                          category.category,
                                          itemIndex
                                        )
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    )}
                  </div>
                )}
              </div>
            );
          }
        )}

        {categories.length === 0 && (
          <div className="flex flex-col justify-center items-center text-center py-12">
            <Image src={emptyMenuImg} alt="Empty menu" className="w-64 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">
              Aucune catégorie créée
            </h3>
          </div>
        )}
      </div>

      {/* Edit Menu Item Modal */}
      {editingItem && (
        <EditMenuItemModal
          categories={categories}
          item={editingItem.item}
          categoryName={editingItem.categoryName}
          itemIndex={editingItem.itemIndex}
          open={!!editingItem}
          onOpenChange={(open) => !open && setEditingItem(null)}
        />
      )}

      {/* Delete Menu Item Dialog */}
      {deletingItem && (
        <DeleteMenuItemDialog
          item={deletingItem.item}
          categoryName={deletingItem.categoryName}
          itemIndex={deletingItem.itemIndex}
          open={!!deletingItem}
          onOpenChange={(open) => !open && setDeletingItem(null)}
        />
      )}
    </div>
  );
};

export default MenuManagement;
