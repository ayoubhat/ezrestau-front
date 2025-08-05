"use client";

import { useState, useRef, JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { Download, Eye, Globe, HandPlatter, ThumbsUp } from "lucide-react";
import { checkGooglePlaceIdAndAlert, downloadQRCode } from "@/lib/utils";
import QRCodePreviewDialog from "./QRCodePreviewDialog";
import Image from "next/image";
import setupImg from "@/public/need-setup.svg";

interface QRCodeType {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  urlPath: string;
  isExternalUrl: boolean;
}

const qrCodeTypes: QRCodeType[] = [
  {
    id: "menu",
    title: "Menu",
    description: "Accès direct à votre carte en ligne",
    icon: <HandPlatter className="w-6 h-6" />,
    urlPath: "/",
    isExternalUrl: false,
  },
  {
    id: "website",
    title: "Site Web",
    description: "Redirection vers votre site web",
    icon: <Globe className="w-6 h-6" />,
    urlPath: "",
    isExternalUrl: false,
  },
  // {
  //   id: "complete",
  //   title: "Page Complète",
  //   description: "Site, réseaux sociaux, menu et avis Google",
  //   icon: <Share className="w-6 h-6" />,
  //   urlPath: "/links",
  //   isExternalUrl: false,
  // },
  {
    id: "review",
    title: "Laisser un Avis",
    description: "Accès rapide pour laisser un avis",
    icon: <ThumbsUp className="w-6 h-6" />,
    urlPath: "",
    isExternalUrl: true,
  },
];

const QRCodesForm = () => {
  const { user, isLoaded } = useUser();
  const [openDialogType, setOpenDialogType] = useState<string | null>(null);

  const qrRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });

  if (isLoading || !isLoaded) {
    return (
      <div className="flex items-center justify-center py-8">Chargement...</div>
    );
  }

  if (!restaurant?.subdomain) {
    return (
      <div className="flex flex-col justify-center items-center text-center py-12">
        <Image src={setupImg} alt="Setup image" className="w-64 mb-2" />
        <h3 className="text-md max-w-sm font-medium text-gray-900">
          Pour pouvoir télécharger vos QR codes, votre site doit être en ligne.{" "}
        </h3>
      </div>
    );
  }

  const baseUrl = `https://${restaurant.subdomain}.ezrestau.fr`;

  const getQRUrl = (type: QRCodeType) => {
    if (type.id === "review" && restaurant.google_place?.place_id) {
      return `https://search.google.com/local/writereview?placeid=${restaurant.google_place.place_id}`;
    }
    if (type.id === "review") {
      // Return a placeholder URL when no Google Place ID
      return "https://google.com/search?q=laisser+avis+restaurant";
    }
    return `${baseUrl}${type.urlPath}`;
  };

  const handleViewClick = (type: QRCodeType) => {
    if (
      !checkGooglePlaceIdAndAlert(type.id, restaurant.google_place?.place_id)
    ) {
      return;
    }
    setOpenDialogType(type.id);
  };

  const handleDownloadClick = (typeId: string) => {
    if (
      !checkGooglePlaceIdAndAlert(typeId, restaurant.google_place?.place_id)
    ) {
      return;
    }
    downloadQRCode(typeId, qrRefs);
  };

  const currentDialogType = qrCodeTypes.find((t) => t.id === openDialogType);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {qrCodeTypes.map((type) => {
        const url = getQRUrl(type);
        const qrValue = url;
        const hasGooglePlaceId = restaurant.google_place?.place_id;

        return (
          <Card
            key={type.id}
            className="relative p-4 flex flex-col items-center shadow-none rounded-md"
          >
            <CardHeader className="p-0 w-full">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-gray-100 p-2">{type.icon}</div>
                <div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {type.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4 w-full">
              <div
                className={`bg-white p-2 rounded-lg border ${
                  type.id === "review" && !hasGooglePlaceId
                    ? "opacity-50 grayscale"
                    : ""
                }`}
                ref={(el) => {
                  qrRefs.current[type.id] = el;
                }}
              >
                <QRCodeSVG
                  value={qrValue}
                  size={120}
                  bgColor="#ffffff"
                  fgColor="#22223b"
                  level="M"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Button
                  className="flex-1"
                  onClick={() => handleDownloadClick(type.id)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le QR Code
                </Button>
                <Button variant="outline" onClick={() => handleViewClick(type)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Voir
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <QRCodePreviewDialog
        isOpen={!!openDialogType}
        onClose={() => setOpenDialogType(null)}
        qrType={currentDialogType || null}
        qrUrl={currentDialogType ? getQRUrl(currentDialogType) : ""}
        qrRefs={qrRefs}
        googlePlaceId={restaurant.google_place?.place_id}
      />
    </div>
  );
};

export default QRCodesForm;
