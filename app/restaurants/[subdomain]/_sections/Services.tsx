import React from "react";
import {
  FaWheelchair,
  FaDog,
  FaCalendarAlt,
  FaParking,
  FaLeaf,
  FaWifi,
  FaCheck,
  FaUtensils,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { BiSolidHomeHeart } from "react-icons/bi";
import { MdDeliveryDining, MdTableRestaurant } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import SectionLayout from "../Section";

const iconMap: Record<string, React.ReactNode> = {
  "Accès mobilité réduite": <FaWheelchair className="w-8 h-8" />,
  "Accueil groupes": <FaPeopleGroup className="w-8 h-8" />,
  "Animaux domestiques autorisés": <FaDog className="w-8 h-8" />,
  "À emporter": <IoFastFoodSharp className="w-8 h-8" />,
  "Événements privés": <FaCalendarAlt className="w-8 h-8" />,
  "Fait maison": <BiSolidHomeHeart className="w-8 h-8" />,
  Livraison: <MdDeliveryDining className="w-8 h-8" />,
  "Sur place": <FaUtensils className="w-8 h-8" />,
  "Parking réservé": <FaParking className="w-8 h-8" />,
  "Produits locaux": <FaLeaf className="w-8 h-8" />,
  "Terrasse extérieure": <MdTableRestaurant className="w-8 h-8" />,
  "Wi-Fi gratuit": <FaWifi className="w-8 h-8" />,
  Halal: <FaCheck className="w-8 h-8" />,
  Climatisation: <TbAirConditioning className="w-8 h-8" />,
};

const Services = ({ services }: { services: string[] }) => {
  return (
    <SectionLayout
      title={"Nos Services"}
      description={"Tout ce que nous mettons en place pour vous satisfaire"}
    >
      <div className="w-full flex flex-wrap justify-center gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {services.map((serviceName, index) => (
          <div
            key={index}
            className="text-center p-6 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors w-64"
          >
            <div className="text-orange-600 mb-4 flex justify-center">
              {iconMap[serviceName] ?? (
                <span className="w-8 h-8 text-gray-400">?</span>
              )}
            </div>
            <p className="text-gray-700 font-medium">{serviceName}</p>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default Services;
