import Link from "next/link";
import React from "react";
import { SiUbereats } from "react-icons/si";
import { SiDeliveroo } from "react-icons/si";
import { MdRestaurant } from "react-icons/md";
import SectionLayout from "../Section";

const iconMap: Record<string, React.ReactNode> = {
  "Uber Eats": <SiUbereats className="w-10 h-10" />,
  Deliveroo: <SiDeliveroo className="w-10 h-10" />,
  "Livraison du restaurant": <MdRestaurant className="w-10 h-10" />,
};

const colorMap: Record<string, string> = {
  "Uber Eats": "from-green-400 to-green-600",
  Deliveroo: "from-cyan-400 to-cyan-600",
  "Livraison du restaurant": "from-orange-400 to-orange-600",
};

interface DeliveryProps {
  services: string[]; // Just service names
}

const Delivery: React.FC<DeliveryProps> = ({ services }) => {
  const descriptionText = `Faites-vous livrer chez vous ou au bureau via ${services
    .join(services.length > 2 ? ", " : " ou ")
    .replace(/, ([^,]*)$/, " ou $1")}.`;

  return (
    <SectionLayout title="On vous livre ?" description={descriptionText}>
      <div className="flex w-full flex-wrap gap-8 md:gap-28 justify-center">
        {services.map((serviceName, index) => (
          <Link
            href={"/"}
            key={index}
            className="group flex flex-col items-center w-full md:w-fit transform transition-all duration-300 hover:scale-105"
          >
            <div
              className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${
                colorMap[serviceName] ?? "from-gray-400 to-gray-600"
              } rounded-2xl mb-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-400/20 group-hover:-translate-y-1`}
            >
              <div className="text-white transition-transform duration-300 group-hover:scale-110">
                {iconMap[serviceName] ?? (
                  <span className="w-10 h-10 text-gray-400">?</span>
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
              {serviceName}
            </h3>
          </Link>
        ))}
      </div>
    </SectionLayout>
  );
};

export default Delivery;
