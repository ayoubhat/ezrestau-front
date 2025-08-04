import Services from "../restaurants/[subdomain]/_sections/Services";
import Delivery from "../restaurants/[subdomain]/_sections/Delivery";
import MenuSection from "../restaurants/[subdomain]/_sections/Menu";
import WorkingHours from "../restaurants/[subdomain]/_sections/WorkingHours";
import Footer from "../restaurants/[subdomain]/Footer";
import { restaurant } from "../demo/demo-restaurant";
import Hero from "../restaurants/[subdomain]/_sections/Hero";
import Reviews from "../restaurants/[subdomain]/_sections/Reviews";

const RestaurantWebsite = () => {
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
      <MenuSection menu={restaurant.menu ?? []} />
      <Services services={restaurant.services ?? []} />
      {restaurant.opening_hours && (
        <WorkingHours
          openingHours={restaurant.opening_hours}
          title={"Nos Horaires d'Ouverture"}
        />
      )}
      <Delivery services={deliveryServices} />
      <Reviews
        googlePlace={restaurant.google_place}
        googleReviews={restaurant.google_reviews}
      />
      <Footer restaurant={restaurant} />
    </div>
  );
};

export default RestaurantWebsite;
