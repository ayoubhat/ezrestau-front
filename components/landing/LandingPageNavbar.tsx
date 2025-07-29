"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ChefHat, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const LandingPageNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-200"
          >
            <ChefHat className="h-6 w-6 text-orange-600 group-hover:rotate-12 transition-transform duration-200" />
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">EzRestau</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-orange-100 text-orange-700 border border-orange-200 group-hover:bg-orange-200 transition-colors duration-200">
                BETA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-orange-600 transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-orange-600 transition-colors"
            >
              Tarif
            </Link>

            <div className="flex items-center space-x-2">
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" size="sm">
                    Connexion
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Essai gratuit
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>

            <SignedIn>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Mon restaurant
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link
                href="#features"
                className="text-gray-600 hover:text-orange-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fonctionnalités
              </Link>
              <Link
                href="#pricing"
                className="text-gray-600 hover:text-orange-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tarif
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <SignedOut>
                  <SignInButton>
                    <Button variant="outline" className="w-full">
                      Connexion
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Essai gratuit
                    </Button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      Mon restaurant
                    </Button>
                  </Link>
                  <div className="flex justify-center pt-2">
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingPageNavbar;
