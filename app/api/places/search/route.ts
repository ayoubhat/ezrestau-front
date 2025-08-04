import { GooglePlace } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const type = searchParams.get("type") || "restaurant";

  if (!query) {
    return NextResponse.json(
      { message: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?` +
        `query=${encodeURIComponent(query)}&` +
        `type=${type}&` +
        `fields=place_id,name,formatted_address,rating,user_ratings_total,geometry,types,business_status&` +
        `key=${process.env.GOOGLE_PLACES_API_KEY}`
    );

    const data = await response.json();

    if (data.status === "OK") {
      // Filter for active restaurants only
      const activePlaces = data.results
        .filter(
          (place: GooglePlace) =>
            place.business_status === "OPERATIONAL" || !place.business_status
        )
        .filter((place: GooglePlace) =>
          place.types?.some((type: string) =>
            [
              "restaurant",
              "food",
              "meal_takeaway",
              "meal_delivery",
              "cafe",
              "bakery",
            ].includes(type)
          )
        );

      return NextResponse.json({ places: activePlaces });
    } else {
      console.error("Places API error:", data.status, data.error_message);
      return NextResponse.json(
        {
          message: "Failed to search places",
          error: data.error_message,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Search places error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
