"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  HelpCircle,
  Clock,
  MapPin,
  Settings,
  FileText,
  Hamburger,
  HandPlatter,
  Phone,
  LayoutDashboard,
} from "lucide-react";
import { MdDeliveryDining } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

const restaurantNavItems = [
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
  // {
  //   name: "Avis clients",
  //   url: "/dashboard/reviews",
  //   icon: Star,
  // },
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

// const accountNavItems = [
//   {
//     name: "Abonnement et facturation",
//     url: "/dashboard/subscription",
//     icon: CreditCard,
//   },
//   {
//     name: "Support",
//     url: "/dashboard/support",
//     icon: HelpCircle,
//   },
// ];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-[240px] bg-white flex-col h-full border-r">
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2">
          {/* <p className="text-[0.65rem] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Mon restaurant
          </p> */}
          <ul className="space-y-1">
            {restaurantNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;

              return (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className={`flex items-center px-3 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-orange-50 text-orange-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {/* 
        <div className="px-4">
          <p className="text-[0.65rem] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Mon compte
          </p>
          <ul className="space-y-1">
            {accountNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;

              return (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className={`flex items-center px-3 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-orange-50 text-orange-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div> */}
      </nav>
    </div>
  );
};

export default Sidebar;
