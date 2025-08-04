import GoogleReviewsCarousel from "@/app/dashboard/_components/GoogleReviewsCarousel";
import { GoogleReview, GooglePlace } from "@/types";
import { Star } from "lucide-react";
import React from "react";
import SectionLayout from "../Section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ReviewsProps {
  googlePlace?: GooglePlace | null;
  googleReviews?: GoogleReview[];
}

const Reviews = ({ googlePlace, googleReviews = [] }: ReviewsProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : index < rating
                ? "text-yellow-400 fill-yellow-200"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <SectionLayout title="Avis Google">
      <div className="space-y-4 mt-[-1rem] mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-3 shadow-sm">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                {renderStars(googlePlace?.rating || 1)}
                <span className="text-2xl font-bold text-gray-900">
                  {googlePlace?.rating}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {googlePlace?.user_ratings_total} avis disponibles
              </p>
            </div>
          </div>
        </div>

        <GoogleReviewsCarousel reviews={googleReviews} />

        <div className="flex flex-row justify-center gap-4">
          <Button asChild>
            <Link
              href={`https://search.google.com/local/writereview?placeid=${googlePlace?.place_id}`}
              className="flex items-center gap-2"
              target="_blank"
            >
              Laisser un avis
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link
              href={`https://www.google.com/maps/place/?q=place_id:${googlePlace?.place_id}`}
              target="_blank"
              className="flex items-center gap-2"
            >
              Voir tous les avis
            </Link>
          </Button>
        </div>
      </div>
    </SectionLayout>
  );
};

export default Reviews;
