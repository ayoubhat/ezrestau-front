import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import ReviewCard from "./ReviewCard";
import { GoogleReview } from "@/types";

const GoogleReviewsCarousel = ({ reviews }: { reviews: GoogleReview[] }) => {
  return (
    <div className="relative py-4 px-12">
      <Carousel>
        <CarouselContent className="ml-1 sm:ml-0">
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-1">
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default GoogleReviewsCarousel;
