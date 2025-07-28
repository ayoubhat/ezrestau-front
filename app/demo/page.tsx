import Services from "../restaurants/[subdomain]/_sections/Services";
import Delivery from "../restaurants/[subdomain]/_sections/Delivery";
import MenuSection from "../restaurants/[subdomain]/_sections/Menu";
import WorkingHours from "../restaurants/[subdomain]/_sections/WorkingHours";
import Footer from "../restaurants/[subdomain]/Footer";
import Navbar from "../restaurants/[subdomain]/Navbar";
import { restaurant } from "../demo/demo-restaurant";
import Hero from "../restaurants/[subdomain]/_sections/Hero";

const RestaurantWebsite = () => {
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
  const transformOpeningHours = (
    openingHours:
      | { [key: string]: { open: string; close: string }[] }
      | undefined
  ) => {
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

    return Object.entries(openingHours).map(([day, hours]) => {
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

  const deliveryServices =
    restaurant.delivery_info?.platforms
      ?.map((platform) => {
        const platformNameMap: Record<string, string> = {
          deliveroo: "Deliveroo",
          uber_eats: "Uber Eats",
          livraison_du_restaurant: "Livraison du restaurant",
        };
        return platformNameMap[platform.name] || platform.name;
      })
      .filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar restaurant={restaurant} />
      <Hero name={restaurant.name} />
      {hasMenu() && <MenuSection menu={restaurant.menu ?? []} />}
      {hasServices() && <Services services={restaurant.services ?? []} />}
      {hasOpeningHours() && (
        <WorkingHours
          openingHours={transformOpeningHours(restaurant.opening_hours)}
          title={"Nos Horaires d'Ouverture"}
        />
      )}
      {hasDeliveryInfo() && <Delivery services={deliveryServices} />}
      <Footer restaurant={restaurant} />
    </div>
  );
};

export default RestaurantWebsite;
