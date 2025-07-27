"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import PageHeader from "./_components/PageHeader";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import ProgressionCard from "./_components/ProgressionCard";
import TipCard from "@/components/TipCard";

const DashboardPage = () => {
  const { user, isLoaded } = useUser();

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });

  // Calculate configuration progress
  const calculateProgress = () => {
    if (!restaurant) return { percentage: 0, completed: [], missing: [] };

    const sections = [
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
          restaurant.payments_accepted &&
          restaurant.payments_accepted.length > 0
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

  if (isLoading || !isLoaded) {
    return (
      <div className="space-y-4">
        <PageHeader title="Tableau de bord" description="" />
        <div>Chargement...</div>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="space-y-4">
      <PageHeader
        title="Tableau de bord"
        description="Gérez votre restaurant et suivez vos progrès"
      />
      <TipCard>
        <p>
          Complétez votre configuration à au moins 70% pour pouvoir publier
          votre site web.
        </p>
      </TipCard>

      <ProgressionCard progress={progress} />
    </div>
  );
};

export default DashboardPage;
