import { GoogleReview } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");

  if (!placeId) {
    return NextResponse.json(
      { message: "Place ID parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch place details including reviews in French
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?` +
        `place_id=${placeId}&` +
        `fields=name,reviews,rating,user_ratings_total&` +
        `language=fr&` + // Add language parameter for French
        `key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const data = await response.json();

    if (data.status === "OK") {
      const place = data.result;
      const reviews = place.reviews || [];

      const formattedReviews: GoogleReview[] = reviews.map(
        (review: GoogleReview) => ({
          author_name: review.author_name,
          profile_photo_url: review.profile_photo_url,
          rating: review.rating,
          relative_time_description: review.relative_time_description,
          text: review.text,
        })
      );

      return NextResponse.json({
        success: true,
        place_name: place.name,
        total_reviews: place.user_ratings_total,
        average_rating: place.rating,
        reviews: formattedReviews,
        reviews_count: formattedReviews.length,
      });
    } else {
      console.error(
        "Place Details API error:",
        data.status,
        data.error_message
      );
      return NextResponse.json(
        {
          message: "Failed to fetch reviews",
          error: data.error_message,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Fetch reviews error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
