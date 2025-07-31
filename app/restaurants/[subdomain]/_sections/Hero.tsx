import Image from "next/image";
import React from "react";
import heroImg from "@/public/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import NavBar from "@/app/restaurants/[subdomain]/Navbar";
import { DeliveryInfo } from "@/types";
import { MapPin } from "lucide-react";

interface HeroProps {
  name?: string;
  logo?: string;
  delivery_info?: DeliveryInfo;
  phone?: string;
  address?: string;
}

const Hero = ({ name, logo, delivery_info, phone, address }: HeroProps) => {
  return (
    <section
      id="accueil"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute flex justify-center top-0 left-0 right-0 z-20">
        <NavBar
          name={name}
          logo={logo}
          delivery_info={delivery_info}
          phone={phone}
        />
      </div>

      <div className="absolute inset-0">
        <Image
          src={heroImg}
          alt="Restaurant"
          width={800}
          height={600}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Bienvenue au {name}
        </h1>
        <p className="text-xl font-semibold md:text-2xl mb-8 drop-shadow-md">
          <MapPin className="inline-block mr-2" /> {address}
        </p>
        <div className="space-x-4">
          <Button className="bg-orange-700 hover:bg-orange-600 text-md text-white px-6 py-3 rounded-sm font-semibold transition-colors">
            Voir la carte
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
