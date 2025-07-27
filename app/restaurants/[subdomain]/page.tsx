"use client";

import Services from "./_sections/Services";
import Delivery from "./_sections/Delivery";
import MenuSection from "./_sections/Menu";
import WorkingHours from "./_sections/WorkingHours";
import { useParams } from "next/navigation";
import { getRestaurantBySubdomain } from "@/actions/get-restaurant-by-subdomain";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Minimalist Loading Component
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
          Veuillez vérifier l'adresse ou réessayer.
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
    error,
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

  // Helper functions to check if data exists
  const hasMenu = () => {
    return (
      restaurant.menu &&
      Array.isArray(restaurant.menu) &&
      restaurant.menu.length > 0
    );
  };

  const hasServices = () => {
    return (
      restaurant.services &&
      Array.isArray(restaurant.services) &&
      restaurant.services.length > 0
    );
  };

  const hasOpeningHours = () => {
    return (
      restaurant.opening_hours &&
      typeof restaurant.opening_hours === "object" &&
      Object.keys(restaurant.opening_hours).length > 0
    );
  };

  const hasDeliveryInfo = () => {
    return (
      restaurant.delivery_info?.platforms &&
      Array.isArray(restaurant.delivery_info.platforms) &&
      restaurant.delivery_info.platforms.length > 0
    );
  };

  // Transform opening hours from API format to component format
  const transformOpeningHours = (openingHours: any) => {
    // Add null/undefined check
    if (!openingHours || typeof openingHours !== "object") {
      return [];
    }

    const dayMapping: Record<string, string> = {
      sunday: "Dimanche",
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
    };

    return Object.entries(openingHours).map(([day, hours]: [string, any]) => {
      const dayName = dayMapping[day];
      let hoursText = "Fermé";

      if (Array.isArray(hours) && hours.length > 0) {
        hoursText = hours.map((h) => `${h.open} - ${h.close}`).join(", ");
      }

      return {
        day: dayName,
        hours: hoursText,
      };
    });
  };

  // Extract delivery platforms
  const deliveryServices =
    restaurant.delivery_info?.platforms
      ?.map((platform: any) => {
        const platformNameMap: Record<string, string> = {
          deliveroo: "Deliveroo",
          uber_eats: "Uber Eats",
          livraison_du_restaurant: "Livraison du restaurant",
        };
        return platformNameMap[platform.name] || platform.name;
      })
      .filter(Boolean) || [];

  const transformedOpeningHours = transformOpeningHours(
    restaurant.opening_hours
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar restaurant={restaurant} />

      <section
        id="accueil"
        className="relative h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Bienvenue au {restaurant.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Savourez l'authenticité dans chaque bouchée
          </p>
          <div className="space-x-4">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Voir la carte
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Commander maintenant
            </button>
          </div>
        </div>
      </section>
      {hasMenu() && <MenuSection menu={restaurant.menu ?? []} />}
      {hasServices() && <Services services={restaurant.services ?? []} />}
      {hasOpeningHours() && (
        <WorkingHours
          openingHours={transformedOpeningHours}
          title={"Nos Horaires d'Ouverture"}
        />
      )}
      {hasDeliveryInfo() && <Delivery services={deliveryServices} />}
      <Footer restaurant={restaurant} />
    </div>
  );
};

export default RestaurantWebsite;
