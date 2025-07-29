import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Link from "next/link";
import { Restaurant } from "@/types";

const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <FaFacebook className="w-4 h-4" />,
  instagram: <FaInstagram className="w-4 h-4" />,
  tiktok: <FaTiktok className="w-4 h-4" />,
  twitter: <FaX className="w-4 h-4" />,
  youtube: <FaYoutube className="w-4 h-4" />,
  linkedin: <FaLinkedin className="w-4 h-4" />,
};

const Footer = ({ restaurant }: { restaurant: Restaurant }) => {
  if (!restaurant) {
    return null;
  }

  // Extract contact information with fallbacks
  const restaurantName = restaurant.name || "Restaurant";
  const phone = restaurant.phone || "";
  const email = restaurant.email || "";
  const address = restaurant.address || "";
  const city = restaurant.city || "";
  const fullAddress = city ? `${address}, ${city}` : address;
  const seo_description = restaurant.seo_description;
  const paymentMethods = restaurant.payments_accepted || [];
  const socialLinks = restaurant.social_links
    ? Object.entries(restaurant.social_links)
        .filter(([value]) => value)
        .map(([platform, url]) => ({
          name: platform,
          url: url as string,
          icon: platform,
        }))
    : [];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
              {restaurantName}
            </h3>

            <p className="text-gray-300 leading-relaxed mb-6">
              {seo_description}
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-8">
                <h5 className="text-sm font-semibold mb-4 text-gray-400">
                  Suivez-nous
                </h5>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      {socialIconMap[social.icon.toLowerCase()] ?? (
                        <span className="w-4 h-4 text-gray-400">?</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-md font-semibold mb-6 flex items-center space-x-2">
              <span>Nous rejoindre</span>
            </h4>
            <div className="text-sm space-y-4">
              {fullAddress && (
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{fullAddress}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{email}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-6">Informations</h4>
            <ul className="text-sm space-y-3">
              <li>
                <Link href="/demo">Accueil</Link>
              </li>
              <li>
                <Link href="/demo">La carte</Link>
              </li>
              <li>
                <Link href="/demo">Livraison à domicile</Link>
              </li>
              <li>
                <Link href="/demo">Contactez nous</Link>
              </li>
            </ul>
          </div>

          {paymentMethods.length > 0 && (
            <div>
              <h4 className="text-md font-semibold mb-6 flex items-center space-x-2">
                <span>Moyens de paiements acceptés</span>
              </h4>
              <div className="text-sm space-y-3">
                {paymentMethods.map((method, index) => (
                  <p key={index}>{method}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="flex gap-1 text-gray-400 text-sm">
              &copy; 2025 {restaurantName}. Tous droits réservés. - Site créé
              avec <FaHeart className="w-3 h-5 text-amber-400" />
              par
              <Link
                href={"/"}
                className="text-amber-400 hover:text-amber-300 transition-colors font-medium hover:underline"
              >
                EzRestau
              </Link>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href={"/sign-in"}
                className="text-gray-400 hover:text-white transition-colors text-sm hover:underline"
              >
                Administration
              </Link>
              <Link
                href={"/mentions-legales"}
                className="text-gray-400 hover:text-white transition-colors text-sm hover:underline"
              >
                Mentions légales
              </Link>
              <Link
                href={"/politique-confidentialite"}
                className="text-gray-400 hover:text-white transition-colors text-sm hover:underline"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
