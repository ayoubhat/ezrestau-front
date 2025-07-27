import { Restaurant } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .replace(/^-+|-+$/g, "");
};

export const formatSiret = (value: string) => {
  const digits = value.replace(/\D/g, "");

  const limitedDigits = digits.slice(0, 14);

  if (limitedDigits.length <= 3) {
    return limitedDigits;
  } else if (limitedDigits.length <= 6) {
    return `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(3)}`;
  } else if (limitedDigits.length <= 9) {
    return `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(
      3,
      6
    )} ${limitedDigits.slice(6)}`;
  } else {
    return `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(
      3,
      6
    )} ${limitedDigits.slice(6, 9)} ${limitedDigits.slice(9)}`;
  }
};

export const getCharacterCountColor = (
  current: number,
  max: number,
  optimal: number
) => {
  if (current > max) return "text-red-500";
  if (current >= optimal) return "text-green-600";
  if (current >= optimal * 0.8) return "text-yellow-600";
  return "text-gray-500";
};

export interface ProgressSection {
  key: string;
  name: string;
  completed: boolean;
  path: string;
}

export interface ProgressResult {
  percentage: number;
  completed: ProgressSection[];
  missing: ProgressSection[];
  sections: ProgressSection[];
}

export const calculateProgress = (
  restaurant: Restaurant | null | undefined
): ProgressResult => {
  if (!restaurant)
    return {
      percentage: 0,
      completed: [],
      missing: [],
      sections: [],
    };

  const sections: ProgressSection[] = [
    {
      key: "basic_info",
      name: "Informations de base",
      completed: !!(restaurant.name && restaurant.subdomain),
      path: "/dashboard/configuration",
    },
    {
      key: "contact",
      name: "Contact",
      completed: !!(restaurant.phone || restaurant.email),
      path: "/dashboard/contact",
    },
    {
      key: "location",
      name: "Localisation",
      completed: !!restaurant.address,
      path: "/dashboard/localisation",
    },
    {
      key: "hours",
      name: "Horaires d'ouverture",
      completed: !!(
        restaurant.opening_hours &&
        Object.keys(restaurant.opening_hours).length > 0
      ),
      path: "/dashboard/horaires",
    },
    {
      key: "menu",
      name: "Menu/Carte",
      completed: !!(restaurant.menu && restaurant.menu.length > 0),
      path: "/dashboard/menu",
    },
    {
      key: "services",
      name: "Services",
      completed: !!(restaurant.services && restaurant.services.length > 0),
      path: "/dashboard/services",
    },
    {
      key: "social",
      name: "Réseaux sociaux",
      completed: !!(
        restaurant.social_links &&
        Object.values(restaurant.social_links).some((link) => link)
      ),
      path: "/dashboard/contact",
    },
    {
      key: "payments",
      name: "Méthodes de paiement acceptées",
      completed: !!(
        restaurant.payments_accepted && restaurant.payments_accepted.length > 0
      ),
      path: "/dashboard/paiements",
    },
    {
      key: "seo",
      name: "Optimisation pour les moteurs de recherche",
      completed: !!(restaurant.seo_title && restaurant.seo_description),
      path: "/dashboard/seo",
    },
    {
      key: "legal",
      name: "Informations légales",
      completed: !!(
        restaurant.legal_info &&
        Object.values(restaurant.legal_info).some((link) => link)
      ),
      path: "/dashboard/legal",
    },
    {
      key: "delivery",
      name: "Service de livraison",
      completed: !!(
        restaurant.delivery_info &&
        restaurant.delivery_info.platforms &&
        restaurant.delivery_info.platforms.length > 0
      ),
      path: "/dashboard/delivery",
    },
  ];

  const completed = sections.filter((section) => section.completed);
  const missing = sections.filter((section) => !section.completed);
  const percentage = Math.round((completed.length / sections.length) * 100);

  return { percentage, completed, missing, sections };
};
