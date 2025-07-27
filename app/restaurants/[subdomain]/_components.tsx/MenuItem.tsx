import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const MenuItem = ({
  name,
  description,
  price,
  image,
}: {
  name: string;
  description: string;
  price: any;
  image: any;
}) => {
  const imageSrc = typeof image === "string" ? image : image.src || image;
  const isExternalImage =
    typeof image === "string" ||
    (typeof image === "object" && image.src && typeof image.src === "string");

  return (
    <Card className="group hover:shadow-warm transition-all duration-300 overflow-hidden animate-scale-in">
      <div className="relative">
        <Image
          src={imageSrc}
          alt={name}
          width={400}
          height={192}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized={isExternalImage}
        />

        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full font-bold">
          {price} €
        </div>
      </div>
      <div className="px-3 pb-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default MenuItem;
