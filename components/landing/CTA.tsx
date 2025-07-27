import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Prêt à créer le site de votre restaurant ?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Créez facilement un site professionnel pour votre restaurant avec
          EzRestau
        </p>
        <Link href="/sign-up">
          <Button size="lg" variant="secondary" className="text-lg px-4">
            Commencer maintenant 🚀
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
