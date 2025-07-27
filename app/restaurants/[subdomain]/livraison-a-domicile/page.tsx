import React from "react";
import WorkingHours from "../_sections/WorkingHours";
import SectionLayout from "../Section";
import { MdPlace } from "react-icons/md";
import Delivery from "../_sections/Delivery";
const zonesDeLivraisonPage = () => {
  const openingHours = [
    { day: "Lundi", hours: "11h30 - 14h30 • 18h30 - 22h30", isToday: false },
    { day: "Mardi", hours: "11h30 - 14h30 • 18h30 - 22h30", isToday: false },
    {
      day: "Mercredi",
      hours: "11h30 - 14h30 • 18h30 - 22h30",
      isToday: false,
    },
    { day: "Jeudi", hours: "11h30 - 14h30 • 18h30 - 22h30", isToday: false },
    {
      day: "Vendredi",
      hours: "11h30 - 14h30 • 18h30 - 23h00",
      isToday: false,
    },
    { day: "Samedi", hours: "11h30 - 14h30 • 18h30 - 23h00", isToday: false },
    { day: "Dimanche", hours: "18h30 - 22h30", isToday: false },
  ];
  return (
    <div>
      <Delivery />
      <SectionLayout title={"Zones de livraison"}>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center space-x-3 font-medium">
            <MdPlace className="w-5 h-5 text-orange-500" />
            <span> Rue de la Gastronomie, Paris</span>
          </li>
          <li className="flex items-center space-x-3 font-medium">
            <MdPlace className="w-5 h-5 text-orange-500" />
            <span> Rue de la Gastronomie, Paris</span>
          </li>
          <li className="flex items-center space-x-3 font-medium">
            <MdPlace className="w-5 h-5 text-orange-500" />
            <span> Rue de la Gastronomie, Paris</span>
          </li>
        </ul>
      </SectionLayout>
      <WorkingHours
        openingHours={openingHours}
        title={"Nos Horaires de livraison"}
      />
    </div>
  );
};

export default zonesDeLivraisonPage;
