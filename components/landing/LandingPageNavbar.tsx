import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ChefHat } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const LandingPageNavbar = () => {
  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-orange-600 transition-colors"
          >
            Fonctionnalités
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-orange-600 transition-colors"
          >
            Tarif
          </a>

          <div className="flex items-center space-x-2">
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm">
                  Connexion
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
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
      </div>
    </header>
  );
};

export default LandingPageNavbar;
