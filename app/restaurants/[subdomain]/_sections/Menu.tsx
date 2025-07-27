"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionLayout from "../Section";
import MenuItem from "../_components.tsx/MenuItem";
import placeholderImg from "@/public/menu-item-placeholder.webp";
import { MenuCategory } from "@/types";

const Menu = ({ menu }: { menu: MenuCategory[] }) => {
  // Set the first category as active by default using lowercase ID
  const [activeCategory, setActiveCategory] = useState(
    menu[0]?.category.toLowerCase() || ""
  );
  const [animatingItems, setAnimatingItems] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Extract unique categories from menu
  const categories = menu.map((menuCategory) => ({
    id: menuCategory.category.toLowerCase(),
    name: menuCategory.category,
  }));

  // Get items for active category
  const activeItems =
    menu.find(
      (menuCategory) => menuCategory.category.toLowerCase() === activeCategory
    )?.items || [];

  // Check if scroll buttons are needed
  useEffect(() => {
    const checkScrollNeeded = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const isScrollable = container.scrollWidth > container.clientWidth;
        setShowScrollButtons(isScrollable);
      }
    };

    // Check on mount and when categories change
    checkScrollNeeded();

    // Check on window resize
    window.addEventListener("resize", checkScrollNeeded);

    return () => {
      window.removeEventListener("resize", checkScrollNeeded);
    };
  }, [categories]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setAnimatingItems(true);
    setActiveCategory(categoryId);
    setTimeout(() => setAnimatingItems(false), 100);
  };

  return (
    <SectionLayout
      title={"Notre Carte"}
      description={
        "Découvrez nos spécialités préparées avec amour et des ingrédients frais de qualité"
      }
    >
      <div className="relative mb-12">
        <div className="flex items-center justify-center">
          {/* Left chevron button - only show when scrollable */}
          {showScrollButtons && (
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="absolute left-0 z-20 h-14 w-14 rounded-full bg-white/95 backdrop-blur-lg border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-orange-600" />
            </Button>
          )}

          <div
            ref={scrollContainerRef}
            className={`flex gap-3 overflow-x-auto scrollbar-hide py-4 transition-all duration-300 ${
              showScrollButtons ? "px-16" : "px-4 justify-center"
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-4 text-lg font-semibold transition-all duration-500 whitespace-nowrap flex-shrink-0 rounded-2xl border-2 relative overflow-hidden group ${
                  activeCategory === category.id
                    ? "bg-amber-500 hover:bg-amber-400 text-white border-transparent shadow-lg shadow-orange-500/25 scale-105"
                    : "bg-white text-gray-700  border-gray-200  hover:border-orange-300  hover:bg-orange-50 hover:scale-105"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">{category.name}</span>
              </Button>
            ))}
          </div>

          {/* Right chevron button - only show when scrollable */}
          {showScrollButtons && (
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="absolute right-0 z-20 h-14 w-14 rounded-full bg-white/95  backdrop-blur-lg border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-orange-600" />
            </Button>
          )}
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 transition-all duration-500 ${
          animatingItems
            ? "opacity-0 transform translate-y-4"
            : "opacity-100 transform translate-y-0"
        }`}
      >
        {activeItems.map((item, index) => (
          <MenuItem
            key={index}
            name={item.name}
            description={item.description || ""}
            price={item.price.toString()}
            image={item.image_url || placeholderImg}
          />
        ))}
      </div>
    </SectionLayout>
  );
};

export default Menu;
