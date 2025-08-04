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
        .filter(([platform, url]) => url && url.trim() !== "") // Fixed: check if URL is not empty
        .map(([platform, url]) => ({
          name: platform,
          url: url as string,
          icon: platform,
        }))
    : [];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
              {restaurantName}
            </h3>

            {seo_description && (
              <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                {seo_description}
              </p>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <h5 className="text-sm font-semibold mb-4 text-gray-400">
                  Suivez-nous
                </h5>
                <div className="flex flex-wrap gap-3 sm:gap-4">
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

          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="text-sm sm:text-md font-semibold mb-4 sm:mb-6">
              Nous rejoindre
            </h4>
            <div className="text-sm space-y-3 sm:space-y-4">
              {fullAddress && (
                <div className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="break-words">{fullAddress}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="break-all">{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="break-all">{email}</span>
                </div>
              )}
            </div>
          </div>

          <div className="sm:col-span-1 lg:col-span-1">
            <h4 className="text-sm sm:text-md font-semibold mb-4 sm:mb-6">
              Informations
            </h4>
            <ul className="text-sm space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/demo"
                  className="hover:text-amber-400 transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="hover:text-amber-400 transition-colors"
                >
                  La carte
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="hover:text-amber-400 transition-colors"
                >
                  Livraison à domicile
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="hover:text-amber-400 transition-colors"
                >
                  Contactez nous
                </Link>
              </li>
            </ul>
          </div>

          {paymentMethods.length > 0 && (
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="text-sm sm:text-md font-semibold mb-4 sm:mb-6">
                Moyens de paiements acceptés
              </h4>
              <div className="text-sm space-y-2 sm:space-y-3">
                {paymentMethods.map((method, index) => (
                  <p key={index} className="text-gray-300">
                    {method}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 gap-2">
            <div className="text-gray-400 text-xs sm:text-sm order-2 md:order-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                <span>&copy; 2025 {restaurantName}. Tous droits réservés.</span>
                <span className="flex items-center gap-1 mt-1 sm:mt-0">
                  Site créé avec{" "}
                  <FaHeart className="w-3 h-3 text-amber-400 inline" /> par{" "}
                  <Link
                    href={"/"}
                    className="text-amber-400 hover:text-amber-300 transition-colors font-medium hover:underline"
                  >
                    EzRestau
                  </Link>
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 md:space-x-6 order-1 md:order-2">
              <Link
                href={"/sign-in"}
                className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm hover:underline"
              >
                Administration
              </Link>
              <Link
                href={"/"}
                className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm hover:underline"
              >
                Mentions légales
              </Link>
              <Link
                href={"/"}
                className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm hover:underline"
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
