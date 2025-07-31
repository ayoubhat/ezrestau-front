import Services from "../restaurants/[subdomain]/_sections/Services";
import Delivery from "../restaurants/[subdomain]/_sections/Delivery";
import MenuSection from "../restaurants/[subdomain]/_sections/Menu";
import WorkingHours from "../restaurants/[subdomain]/_sections/WorkingHours";
import Footer from "../restaurants/[subdomain]/Footer";
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

  const hasDeliveryInfo = () => {
    return (
      restaurant.delivery_info?.platforms &&
      Array.isArray(restaurant.delivery_info.platforms) &&
      restaurant.delivery_info.platforms.length > 0
    );
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

  const fullAddress = restaurant.city
    ? `${restaurant.address}, ${restaurant.city}`
    : restaurant.address;

  return (
    <div className="relative flex flex-col gap-4 min-h-screen bg-white">
      <Hero
        name={restaurant.name}
        logo={restaurant.logo_url}
        delivery_info={restaurant.delivery_info}
        phone={restaurant.phone}
        address={fullAddress}
      />
      {hasMenu() && <MenuSection menu={restaurant.menu ?? []} />}
      {hasServices() && <Services services={restaurant.services ?? []} />}
      {restaurant.opening_hours && (
        <WorkingHours
          openingHours={restaurant.opening_hours}
          title={"Nos Horaires d'Ouverture"}
        />
      )}
      {hasDeliveryInfo() && <Delivery services={deliveryServices} />}
      <Footer restaurant={restaurant} />
    </div>
  );
};

export default RestaurantWebsite;
