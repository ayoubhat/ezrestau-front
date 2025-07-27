import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const Pricing = () => {
  const features = [
    "Site web professionnel",
    "Tableau de bord d'administration",
    "Sous-domaine gratuit (.ezrestau.com)",
    "Hébergement haute performance",
    "Sécurité et certificats SSL (https)",
    "Optimisé pour les moteurs de recherche",
    "Maintenance et dépannage 24/7",
    "Support technique par mail",
  ];

  return (
    <section
      id="pricing"
      className="pt-8 pb-20 bg-gradient-to-br from-orange-50 via-white to-orange-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Une solution complète pour
            <span className="text-orange-600 block">votre restaurant</span>
          </h2>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            Tout inclus, sans frais cachés. Démarrez votre transformation
            digitale dès aujourd'hui.
          </p>
        </div>

        <div className="flex justify-center max-w-xl mx-auto">
          <Card className="relative py-6 md:p-6 border-2 border-orange-200 w-full shadow-2xl bg-white hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Plan Standard
              </CardTitle>

              <div className="flex items-baseline justify-center mb-4">
                <span className="text-4xl font-bold text-orange-600">
                  14.99€
                </span>
                <span className="text-gray-500 ml-2 text-xl">/mois</span>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-2">
                <span className="text-orange-700 font-semibold text-sm">
                  🎉 Essai gratuit de 15 jours inclus
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              <ul className="space-y-3 ml-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="bg-orange-600 p-1 rounded-full mr-4 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-100">
                <Link href="/sign-up">
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Commencer l'essai gratuit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
