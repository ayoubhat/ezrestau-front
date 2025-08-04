"use client";

import Services from "./_sections/Services";
import Delivery from "./_sections/Delivery";
import MenuSection from "./_sections/Menu";
import WorkingHours from "./_sections/WorkingHours";
import { useParams } from "next/navigation";
import { getRestaurantBySubdomain } from "@/actions/get-restaurant-by-subdomain";
import { useQuery } from "@tanstack/react-query";
import Footer from "./Footer";
import Hero from "./_sections/Hero";
import Reviews from "./_sections/Reviews";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Simple spinner */}
        <div className="w-8 h-8 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>

        {/* Simple text */}
        <p className="text-gray-600">Chargement...</p>
      </div>
    </div>
  );
};

// Minimalist Error Component
const ErrorScreen = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        {/* Simple error message */}
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          Restaurant introuvable
        </h2>
        <p className="text-gray-600 mb-6">
          Veuillez vérifier l&apos;adresse ou réessayer.
        </p>

        {/* Simple button */}
        <button
          onClick={onRetry}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
};

const RestaurantWebsite = () => {
  const params = useParams();
  const subdomain = (params?.subdomain as string) || "";

  const {
    data: restaurant,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["restaurant", subdomain],
    queryFn: () => getRestaurantBySubdomain(subdomain),
    enabled: !!subdomain,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || !restaurant) {
    return <ErrorScreen onRetry={() => refetch()} />;
  }

  type DeliveryPlatform = { name: string };

  const deliveryServices =
    restaurant.delivery_info?.platforms
      ?.map((platform: DeliveryPlatform) => {
        const platformNameMap: Record<string, string> = {
          deliveroo: "Deliveroo",
          uber_eats: "Uber Eats",
          livraison_du_restaurant: "Livraison du restaurant",
        };
        return platformNameMap[platform.name] || platform.name;
      })
      .filter(Boolean) || [];

  const fullAddress = restaurant.city
    ? `${restaurant.address}, ${restaurant.city}`
    : restaurant.address;

  return (
    <div className="min-h-screen bg-white">
      <Hero
        name={restaurant.name}
        logo={restaurant.logo_url}
        delivery_info={restaurant.delivery_info}
        phone={restaurant.phone}
        address={fullAddress}
      />

      {restaurant.menu && restaurant.menu.length > 0 && (
        <MenuSection menu={restaurant.menu} />
      )}

      {restaurant.services && restaurant.services.length > 0 && (
        <Services services={restaurant.services} />
      )}

      {restaurant.opening_hours && (
        <WorkingHours
          openingHours={restaurant.opening_hours}
          title={"Nos Horaires d'Ouverture"}
        />
      )}

      {restaurant.delivery_info?.platforms && (
        <Delivery services={deliveryServices} />
      )}

      {restaurant.google_place && restaurant.google_reviews && (
        <Reviews
          googlePlace={restaurant.google_place}
          googleReviews={restaurant.google_reviews}
        />
      )}

      <Footer restaurant={restaurant} />
    </div>
  );
};

export default RestaurantWebsite;
