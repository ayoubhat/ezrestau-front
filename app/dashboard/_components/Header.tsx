"use client";

import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { rootDomain } from "@/lib/utils";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Eye, Globe, AlertCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user } = useUser();
  const { data: restaurant } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });

  const isPublished = restaurant?.subdomain || true;

  return (
    <header className="flex w-full justify-between pr-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Badge
          variant={isPublished ? "default" : "destructive"}
          className={`flex items-center gap-1 ${
            isPublished
              ? "bg-green-100 text-green-800 hover:bg-green-200 border"
              : "bg-red-200 text-red-800 hover:bg-red-200 border"
          }`}
        >
          {isPublished ? (
            <>
              <Globe className="h-3 w-3" />
              Publié
            </>
          ) : (
            <>
              <AlertCircle className="h-3 w-3" />
              Hors ligne
            </>
          )}
        </Badge>
      </div>
      <div className="flex items-center space-x-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`https://${restaurant?.subdomain}.${rootDomain}`}
              target="_blank"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                disabled={!isPublished}
              >
                <Eye className="h-4 w-4" />
                Voir le site
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            {isPublished
              ? `${restaurant?.subdomain}.ezrestau.fr`
              : "Votre site n'est pas encore publié"}
          </TooltipContent>
        </Tooltip>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
