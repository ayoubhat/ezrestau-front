"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import {
  MapPin,
  Search,
  Star,
  X,
  Download,
  RefreshCw,
  Trash2,
} from "lucide-react";
import GoogleReviewsCarousel from "../_components/GoogleReviewsCarousel";
import { GooglePlace, GoogleReview } from "@/types";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";

const GoogleReviewsImport = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState<GooglePlace[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<GooglePlace | null>(null);
  const [isImportingReviews, setIsImportingReviews] = useState(false);
  const [importedReviews, setImportedReviews] = useState<GoogleReview[]>([]);

  useEffect(() => {
    if (restaurant) {
      const currentGooglePlace = restaurant?.google_place
        ? restaurant.google_place
        : null;

      const currentGoogleReviews = restaurant?.google_reviews
        ? restaurant.google_reviews
        : [];

      setSelectedPlace(currentGooglePlace);
      setImportedReviews(currentGoogleReviews);
    }
  }, [restaurant]);

  const updateRestaurantMutation = useMutation({
    mutationFn: async (updateData: Record<string, unknown>) => {
      return updateRestaurantByUserId(updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurant", "user", user?.id],
      });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Erreur lors de la mise à jour.");
    },
  });

  const searchGooglePlaces = async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/places/search?query=${encodeURIComponent(query)}&type=restaurant`
      );
      const data = await response.json();

      if (data.places) {
        setPlaces(data.places);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Error searching places:", error);
      toast.error("Erreur lors de la recherche");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 2) {
      const timeoutId = setTimeout(() => {
        searchGooglePlaces(value);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setPlaces([]);
      setShowSuggestions(false);
    }
  };

  const selectGooglePlace = (place: GooglePlace) => {
    setSelectedPlace(place);
    setShowSuggestions(false);
    setSearchQuery("");
    setImportedReviews([]);
    toast.success(`Restaurant "${place.name}" sélectionné`);
  };

  const importReviewsFromGoogle = async () => {
    if (!selectedPlace) return;

    setIsImportingReviews(true);

    try {
      const response = await fetch(
        `/api/places/reviews?placeId=${selectedPlace.place_id}`
      );
      const data = await response.json();

      if (data.success) {
        const reviews = data.reviews;
        setImportedReviews(reviews);

        const updateData = {
          google_place: selectedPlace,
          google_reviews: reviews,
        };

        await updateRestaurantMutation.mutateAsync(updateData);

        toast.success(
          `${data.reviews_count} avis Google importés avec succès!`
        );
      } else {
        toast.error(data.message || "Erreur lors de l'import des avis");
      }
    } catch (error) {
      console.error("Error importing reviews:", error);
      toast.error("Erreur lors de l'import des avis");
    } finally {
      setIsImportingReviews(false);
    }
  };

  const refreshReviews = async () => {
    if (!selectedPlace) return;

    setIsImportingReviews(true);

    try {
      const response = await fetch(
        `/api/places/reviews?placeId=${selectedPlace.place_id}`
      );
      const data = await response.json();

      if (data.success) {
        const reviews = data.reviews;
        setImportedReviews(reviews);

        const updateData = {
          google_place: selectedPlace,
          google_reviews: reviews,
        };

        await updateRestaurantMutation.mutateAsync(updateData);

        toast.success("Avis Google mis à jour avec succès!");
      } else {
        toast.error(data.message || "Erreur lors de la mise à jour des avis");
      }
    } catch (error) {
      console.error("Error refreshing reviews:", error);
      toast.error("Erreur lors de la mise à jour des avis");
    } finally {
      setIsImportingReviews(false);
    }
  };

  const removeAssociation = async () => {
    try {
      const updateData = {
        google_place: null,
        google_reviews: [],
      };

      await updateRestaurantMutation.mutateAsync(updateData);

      setSelectedPlace(null);
      setImportedReviews([]);
      toast.success("Association supprimée avec succès");
    } catch (error) {
      console.error("Error removing association:", error);
      toast.error("Erreur lors de la suppression de l'association");
    }
  };

  const isUpdating = updateRestaurantMutation.isPending;

  // Show loading state while restaurant data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="w-6 h-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="ml-2">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedPlace ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600 mb-2"
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  Restaurant sélectionné
                </Badge>
                <h4 className="font-medium text-green-800">
                  {selectedPlace.name}
                </h4>
                <p className="text-sm text-green-600">
                  {selectedPlace.formatted_address}
                </p>
                {selectedPlace.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{selectedPlace.rating}</span>
                    {selectedPlace.user_ratings_total && (
                      <span className="text-sm text-gray-500">
                        ({selectedPlace.user_ratings_total} avis disponibles)
                      </span>
                    )}
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeAssociation}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                disabled={isUpdating}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Buttons Container */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={
                importedReviews.length > 0
                  ? refreshReviews
                  : importReviewsFromGoogle
              }
              disabled={isImportingReviews || isUpdating}
              className="flex items-center gap-2 w-full sm:w-fit"
            >
              {isImportingReviews || isUpdating ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : importedReviews.length > 0 ? (
                <RefreshCw className="w-4 h-4" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isImportingReviews || isUpdating
                ? "Mise à jour..."
                : importedReviews.length > 0
                ? "Actualiser les avis"
                : "Importer les avis"}
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={removeAssociation}
              disabled={isUpdating}
              className="flex items-center gap-2 w-full sm:w-fit"
            >
              <Trash2 className="w-4 h-4" />
              {isUpdating ? "Suppression..." : "Supprimer l'association"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative flex-1">
            <Input
              placeholder="Recherchez votre restaurant..."
              value={searchQuery}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              className="pr-10"
              disabled={isUpdating}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Search Results */}
          {showSuggestions && places.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {places.map((place) => (
                <div
                  key={place.place_id}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  onClick={() => selectGooglePlace(place)}
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{place.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {place.formatted_address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showSuggestions &&
            places.length === 0 &&
            !isSearching &&
            searchQuery && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
                <p>Aucun restaurant trouvé</p>
                <p className="text-sm mt-1">Essayez avec le nom + la ville</p>
              </div>
            )}
        </div>
      )}

      {importedReviews.length > 0 && (
        <div>
          <h3 className="text-lg font-medium">
            Avis importés ({importedReviews.length})
          </h3>
          <GoogleReviewsCarousel reviews={importedReviews} />
        </div>
      )}
    </div>
  );
};

export default GoogleReviewsImport;
