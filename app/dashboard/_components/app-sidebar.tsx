"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CreditCard,
  Clock,
  MapPin,
  FileText,
  Hamburger,
  HandPlatter,
  Phone,
  LayoutDashboard,
  Settings,
  ChefHat,
} from "lucide-react";
import { MdDeliveryDining } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Menu items.
const items = [
  {
    name: "Tableau de bord",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Configuration du site",
    url: "/dashboard/configuration",
    icon: Settings,
  },
  {
    name: "La carte",
    url: "/dashboard/menu",
    icon: Hamburger,
  },
  {
    name: "Services",
    url: "/dashboard/services",
    icon: HandPlatter,
  },
  {
    name: "Contact",
    url: "/dashboard/contact",
    icon: Phone,
  },
  {
    name: "Horaires d'ouverture",
    url: "/dashboard/opening-hours",
    icon: Clock,
  },
  {
    name: "Localisation",
    url: "/dashboard/location",
    icon: MapPin,
  },
  {
    name: "Livraison",
    url: "/dashboard/delivery",
    icon: MdDeliveryDining,
  },
  {
    name: "Moyens de paiement",
    url: "/dashboard/paiements",
    icon: CreditCard,
  },
  {
    name: "Informations légales",
    url: "/dashboard/legal",
    icon: FileText,
  },
  {
    name: "SEO",
    url: "/dashboard/seo",
    icon: IoSearchSharp,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex justify-center items-center pt-4">
        <SidebarMenu>
          <SidebarMenuItem className="w-full">
            <SidebarMenuButton asChild>
              <Link href="/">
                <ChefHat className="h-6 w-6 text-orange-600" />
                <p className="flex justify-between items-center space-x-2 w-full">
                  <span className="text-lg font-bold text-gray-900">
                    EzRestau
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-orange-100 text-orange-700 border border-orange-200 font-semibold "
                  >
                    BETA
                  </Badge>
                </p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mon restaurant</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      tooltip={item.name}
                      asChild
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url} className="hover:font-semibold">
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
