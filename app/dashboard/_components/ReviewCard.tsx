import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GoogleReview } from "@/types";
import { Star } from "lucide-react";
import React from "react";

const ReviewCard = ({ review }: { review: GoogleReview }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-4 pb-0 flex-shrink-0">
        <div className="flex flex-wrap gap-2 items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={review.profile_photo_url}
                alt={review.author_name}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <AvatarFallback>{review.author_name.charAt(0)} </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">
                {review.author_name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {review.relative_time_description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1 flex flex-col">
        <p className="text-sm text-gray-700 flex-1 line-clamp-10 overflow-hidden">
          {review.text}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
