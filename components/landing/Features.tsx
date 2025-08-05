import { MapPin, SearchCheck, Smartphone, Star, Utensils } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MdDeliveryDining } from "react-icons/md";

const Features = () => {
  const features = [
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Carte Interactive",
      description:
        "Créez et organisez votre menu par catégories avec photos et descriptions détaillées",
    },
    {
      icon: <MdDeliveryDining className="h-8 w-8" />,
      title: "Gestion Livraison",
      description:
        "Intégrez Uber Eats, Deliveroo et autres services de livraison",
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Localisation & Horaires",
      description:
        "Affichez votre adresse, carte Google Maps et horaires d'ouverture",
    },
    {
      icon: <SearchCheck className="h-8 w-8" />,
      title: "Optimisé pour les moteurs de recherche",
      description:
        "Structure et contenu optimisés pour améliorer votre visibilité sur les moteurs de recherche",
    },

    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Design Responsive",
      description: "Site optimisé pour mobile, tablette et desktop",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Avis Google",
      description:
        "Importez automatiquement vos avis Google pour renforcer votre crédibilité",
    },
  ];

  return (
    <section id="features" className="py-20  bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont votre restaurant a besoin
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une solution complète pour créer et gérer la présence en ligne de
            votre établissement
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 p-4 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
