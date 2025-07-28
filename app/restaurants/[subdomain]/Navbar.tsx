"use client";

import { Menu, X, Phone } from "lucide-react";
import { SiUbereats, SiDeliveroo } from "react-icons/si";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Restaurant } from "@/types";
import Image from "next/image";

const Navbar = ({ restaurant }: { restaurant: Restaurant }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // Get phone number from restaurant data with fallbacks
  const getPhoneNumber = () => {
    return restaurant?.phone || "";
  };

  // Get delivery platforms from restaurant data
  const getDeliveryPlatforms = () => {
    const platforms = restaurant?.delivery_info?.platforms || [];
    return {
      hasUberEats: platforms.some((p) =>
        p.name?.toLowerCase().includes("uber")
      ),
      hasDeliveroo: platforms.some((p) =>
        p.name?.toLowerCase().includes("deliveroo")
      ),
      hasSelfDelivery: platforms.some((p) =>
        p.name?.toLowerCase().includes("self")
      ),
    };
  };

  // Check if restaurant offers delivery services
  const hasDeliveryServices = () => {
    const services = restaurant?.services || [];
    const deliveryPlatforms = getDeliveryPlatforms();
    return (
      services.some((service) => service.toLowerCase().includes("livraison")) ||
      deliveryPlatforms.hasUberEats ||
      deliveryPlatforms.hasDeliveroo ||
      deliveryPlatforms.hasSelfDelivery
    );
  };

  const handlePhoneCall = () => {
    const phoneNumber = getPhoneNumber();
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, "_self");
    }
  };

  const handleUberEats = () => {
    const uberEatsUrl = "https://www.ubereats.com/restaurant";
    window.open(uberEatsUrl, "_blank");
  };

  const handleDeliveroo = () => {
    const deliverooUrl = "https://deliveroo.com/restaurant";
    window.open(deliverooUrl, "_blank");
  };

  const deliveryPlatforms = getDeliveryPlatforms();
  const phoneNumber = getPhoneNumber();
  const restaurantName = restaurant?.name || "Restaurant";

  // Determine navbar background - white if scrolled OR mobile menu is open
  const shouldShowWhiteBackground = isScrolled || isMenuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowWhiteBackground
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            {restaurant?.logo_url ? (
              <Image
                src={restaurant.logo_url}
                alt={restaurantName}
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <h1
                className={`text-2xl font-bold transition-colors duration-300 ${
                  shouldShowWhiteBackground
                    ? "text-orange-600"
                    : "text-white drop-shadow-lg"
                }`}
              >
                {restaurantName}
              </h1>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href={`/demo`}
                className={`transition-colors duration-300 font-medium ${
                  shouldShowWhiteBackground
                    ? "text-gray-700 hover:text-orange-600"
                    : "text-white hover:text-orange-300 drop-shadow-md"
                }`}
              >
                Accueil
              </Link>
              <Link
                href={`/demo`}
                className={`transition-colors duration-300 font-medium ${
                  shouldShowWhiteBackground
                    ? "text-gray-700 hover:text-orange-600"
                    : "text-white hover:text-orange-300 drop-shadow-md"
                }`}
              >
                Carte
              </Link>
              {hasDeliveryServices() && (
                <Link
                  href={`/demo`}
                  className={`transition-colors duration-300 font-medium ${
                    shouldShowWhiteBackground
                      ? "text-gray-700 hover:text-orange-600"
                      : "text-white hover:text-orange-300 drop-shadow-md"
                  }`}
                >
                  Livraison
                </Link>
              )}
              <Link
                href={`/demo`}
                className={`transition-colors duration-300 font-medium ${
                  shouldShowWhiteBackground
                    ? "text-gray-700 hover:text-orange-600"
                    : "text-white hover:text-orange-300 drop-shadow-md"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {phoneNumber && (
              <button
                onClick={handlePhoneCall}
                className={`flex items-center font-semibold gap-2 px-4 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm ${"bg-gradient-to-r from-orange-600 to-orange-600 text-white hover:shadow-orange-400/20"}`}
              >
                <Phone className="w-4 h-4" />
                <span>{phoneNumber}</span>
              </button>
            )}

            {deliveryPlatforms.hasUberEats && (
              <button
                onClick={handleUberEats}
                className={`flex items-center font-semibold gap-2 px-4 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm ${"bg-gradient-to-r from-green-400 to-green-600 text-white hover:shadow-green-400/20"}`}
              >
                <SiUbereats className="w-4 h-4" />
                <span className="hidden xl:inline">Uber Eats</span>
              </button>
            )}

            {deliveryPlatforms.hasDeliveroo && (
              <button
                onClick={handleDeliveroo}
                className={`flex items-center font-semibold gap-2 px-4 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm ${"bg-gradient-to-r from-cyan-400 to-cyan-600 text-white hover:shadow-cyan-400/20"}`}
              >
                <SiDeliveroo className="w-4 h-4" />
                <span className="hidden xl:inline">Deliveroo</span>
              </button>
            )}
          </div>

          {/* CTA Buttons - Tablet */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            {phoneNumber && (
              <button
                onClick={handlePhoneCall}
                className={`flex items-center gap-1 px-3 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm ${
                  shouldShowWhiteBackground
                    ? "bg-gradient-to-r from-orange-600 to-orange-600 text-white hover:shadow-orange-400/20"
                    : "bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm"
                }`}
              >
                <Phone className="w-4 h-4" />
              </button>
            )}

            {deliveryPlatforms.hasUberEats && (
              <button
                onClick={handleUberEats}
                className={`flex items-center gap-1 px-3 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm ${
                  shouldShowWhiteBackground
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white hover:shadow-green-400/20"
                    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
                }`}
              >
                <SiUbereats className="w-4 h-4" />
              </button>
            )}

            {deliveryPlatforms.hasDeliveroo && (
              <button
                onClick={handleDeliveroo}
                className={`flex items-center gap-1 px-3 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm ${
                  shouldShowWhiteBackground
                    ? "bg-gradient-to-r from-cyan-400 to-cyan-600 text-white hover:shadow-cyan-400/20"
                    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
                }`}
              >
                <SiDeliveroo className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors duration-300 ${
                shouldShowWhiteBackground
                  ? "text-gray-700 hover:text-orange-600"
                  : "text-white hover:text-orange-300"
              }`}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection("accueil")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-sm transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("carte")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-sm transition-colors"
            >
              Carte
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-sm transition-colors"
            >
              Services
            </button>
            {hasDeliveryServices() && (
              <button
                onClick={() => scrollToSection("livraison")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-sm transition-colors"
              >
                Livraison
              </button>
            )}
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-sm transition-colors"
            >
              Contact
            </button>

            {/* CTA Buttons in Mobile Menu */}
            <div className="border-t pt-2 mt-2">
              {phoneNumber && (
                <button
                  onClick={handlePhoneCall}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {phoneNumber}
                </button>
              )}

              {deliveryPlatforms.hasUberEats && (
                <button
                  onClick={handleUberEats}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors"
                >
                  <SiUbereats className="w-4 h-4" />
                  Commander sur Uber Eats
                </button>
              )}

              {deliveryPlatforms.hasDeliveroo && (
                <button
                  onClick={handleDeliveroo}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors"
                >
                  <SiDeliveroo className="w-4 h-4" />
                  Commander sur Deliveroo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
