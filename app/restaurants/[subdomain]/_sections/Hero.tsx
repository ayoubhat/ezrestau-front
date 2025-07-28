import Image from "next/image";
import React from "react";
import heroImg from "@/public/hero-bg.jpg";
import { Button } from "@/components/ui/button";

interface HeroProps {
  name?: string;
}

const Hero = ({ name }: HeroProps) => {
  return (
    <section
      id="accueil"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
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
        <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
          Savourez l&apos;authenticité dans chaque bouchée
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
