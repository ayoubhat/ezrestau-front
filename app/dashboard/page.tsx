"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import PageHeader from "./_components/PageHeader";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import ProgressionCard from "./_components/ProgressionCard";
import TipCard from "@/components/TipCard";
import { calculateProgress } from "@/lib/utils";

const DashboardPage = () => {
  const { user, isLoaded } = useUser();

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });

  if (isLoading || !isLoaded) {
    return (
      <div className="space-y-4">
        <PageHeader title="Tableau de bord" description="" />
        <div>Chargement...</div>
      </div>
    );
  }

  const progress = calculateProgress(restaurant);

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
