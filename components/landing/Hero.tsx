import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Créez le site web de votre
          <span className="text-orange-600 block">restaurant en minutes</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          La solution complète qui permet aux restaurateurs d'augmenter
          facilement leur visibilité en ligne avec un site web professionnel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-lg px-4"
            >
              Créer mon site gratuitement
            </Button>
          </Link>
          <Link href="/restaurants/demo">
            <Button variant="outline" size="lg" className="text-lg px-4">
              Voir la démo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
