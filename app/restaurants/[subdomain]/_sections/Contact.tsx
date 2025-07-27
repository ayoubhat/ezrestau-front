import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact & Localisation
          </h2>
          <p className="text-xl text-gray-600">
            Venez nous rendre visite ou contactez-nous
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Informations de contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <p className="font-medium">123 Rue de la Paix</p>
                  <p className="text-gray-600">75011 Paris, France</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-orange-600 mr-3" />
                <p>01 23 45 67 89</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-orange-600 mr-3" />
                <p>contact@lebongout.fr</p>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <p className="font-medium">Horaires d'ouverture</p>
                  <p className="text-gray-600">Lun-Dim: 11h30 - 22h30</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Localisation
            </h3>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Carte Google Maps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
