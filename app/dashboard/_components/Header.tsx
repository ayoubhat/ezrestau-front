"use client";

import { Bell, ChefHat, CirclePercent, Eye, User } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { TbPointFilled } from "react-icons/tb";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../../components/ui/tooltip";

const Header = () => {
  const { user, isLoaded } = useUser();
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-200"
          >
            <ChefHat className="h-6 w-6 text-orange-600 group-hover:rotate-12 transition-transform duration-200" />
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">EzRestau</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200 group-hover:bg-orange-200 transition-colors duration-200">
                BETA
              </span>
            </div>
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>

          {restaurant?.name && restaurant?.subdomain && (
            <div>
              <h1 className="text-sm font-semibold">{restaurant?.name}</h1>
            </div>
          )}
        </div>

        {/*href={`https://${restaurant?.subdomain}.ezrestau.com`}*/}

        <div className="flex items-center space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/restaurants/${restaurant?.subdomain}`}
                target="_blank"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" />
                  Voir le site
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              {restaurant?.subdomain}.ezrestau.com
            </TooltipContent>
          </Tooltip>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
