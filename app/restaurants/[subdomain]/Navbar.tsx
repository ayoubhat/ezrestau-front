import Link from "next/link";
import { AlignJustify, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DeliveryInfo } from "@/types";
import { SiDeliveroo, SiUbereats } from "react-icons/si";

interface NavbarProps {
  name?: string;
  logo?: string;
  phone?: string;
  delivery_info?: DeliveryInfo;
}

const NavBar = ({ name, logo, phone, delivery_info }: NavbarProps) => {
  const uberPlatform = delivery_info?.platforms?.find(
    (platform) => platform.name === "uber_eats"
  );
  const deliverooPlatform = delivery_info?.platforms?.find(
    (platform) => platform.name === "deliveroo"
  );

  const hasUberEats = !!uberPlatform;
  const hasDeliveroo = !!deliverooPlatform;

  return (
    <header className="bg-transparent backdrop-blur-md flex justify-between h-16 w-full max-w-5xl items-center p-2">
      <div className="flex-shrink-0">
        {logo ? (
          <Image
            src={logo}
            alt={"logo " + name}
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
          />
        ) : (
          <h1
            className={`text-2xl font-bold transition-colors duration-300 text-orange-600`}
          >
            {name}
          </h1>
        )}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"ghost"}
            className="lg:hidden hover:bg-transparent cursor-pointer"
          >
            <AlignJustify className="h-8 w-8 text-white" />
            <span className="sr-only">Toggle Navigation Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle className="hidden">Navigation Menu</SheetTitle>
          <div className="flex flex-col gap-2 p-4 pt-16">
            {/* {menuItems.map((menuItem, index) => (
              <Link
                href={menuItem.path}
                key={index}
                className="flex w-full items-center py-2 text-lg font-semibold hover:font-semibold"
              >
                {menuItem.label}
              </Link>
            ))} */}
            {phone && (
              <div className="flex items-center font-semibold gap-2 px-4 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm bg-gradient-to-r from-orange-600 to-orange-600 text-white hover:shadow-orange-400/20">
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </div>
            )}

            {hasUberEats && (
              <Link
                key={uberPlatform.name}
                href={uberPlatform.url || "https://www.ubereats.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center font-semibold gap-2 px-4 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm bg-[#00CF65] text-white hover:shadow-green-400/20`}
              >
                <SiUbereats className="w-4 h-4" />
                <span>Uber Eats</span>
              </Link>
            )}

            {hasDeliveroo && (
              <Link
                key={deliverooPlatform.name}
                href={deliverooPlatform.url || "https://www.deliveroo.fr/"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center font-semibold gap-2 px-4 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm bg-gradient-to-r from-cyan-400 to-cyan-600 text-white hover:shadow-cyan-400/20`}
              >
                <SiDeliveroo className="w-4 h-4" />
                <span>Deliveroo</span>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <nav className="ml-auto hidden lg:flex gap-6 items-center">
        {/* {menuItems.map((menuItem, index) => (
          <Link
            href={menuItem.path}
            key={index}
            className="group inline-flex h-9 w-max items-center rounded-md  px-4 py-2 text-sm font-semibold hover:underline "
          >
            {menuItem.label}
          </Link>
        ))} */}
        <div className="hidden lg:flex items-center space-x-3">
          {phone && (
            <div className="flex items-center font-semibold gap-2 px-4 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm bg-gradient-to-r from-orange-600 to-orange-600 text-white hover:shadow-orange-400/20">
              <Phone className="w-4 h-4" />
              <span>{phone}</span>
            </div>
          )}

          {hasUberEats && (
            <Link
              key={uberPlatform.name}
              href={uberPlatform.url || "https://www.ubereats.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center font-semibold gap-2 px-4 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm bg-[#00CF65] text-white hover:shadow-green-400/20`}
            >
              <SiUbereats className="w-4 h-4" />
              <span className="hidden xl:inline">Uber Eats</span>
            </Link>
          )}

          {hasDeliveroo && (
            <Link
              key={deliverooPlatform.name}
              href={deliverooPlatform.url || "https://www.deliveroo.fr/"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center font-semibold gap-2 px-4 py-2 rounded-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm bg-gradient-to-r from-cyan-400 to-cyan-600 text-white hover:shadow-cyan-400/20`}
            >
              <SiDeliveroo className="w-4 h-4" />
              <span className="hidden xl:inline">Deliveroo</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
