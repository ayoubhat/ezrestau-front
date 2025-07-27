"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";

const formSchema = z.object({
  address: z.string().min(1, "L'adresse est requise"),
  postal_code: z.string().min(1, "Le code postal est requis"),
  city: z.string().min(1, "La ville est requise"),
  latitude: z.number().min(-90).max(90, "Latitude invalide").optional(),
  longitude: z.number().min(-180).max(180, "Longitude invalide").optional(),
  google_maps_link: z
    .string()
    .url("URL Google Maps invalide")
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

const LocationForm = () => {
  const { user, isLoaded } = useUser();
  const queryClient = useQueryClient();
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: restaurant?.address ?? "",
      postal_code: restaurant?.postal_code ?? "",
      city: restaurant?.city ?? "",
      latitude: restaurant?.latitude ?? undefined,
      longitude: restaurant?.longitude ?? undefined,
      google_maps_link: restaurant?.google_maps_link ?? "",
    },
    values: restaurant
      ? {
          address: restaurant.address ?? "",
          postal_code: restaurant.postal_code ?? "",
          city: restaurant.city ?? "",
          latitude: restaurant.latitude ?? undefined,
          longitude: restaurant.longitude ?? undefined,
          google_maps_link: restaurant.google_maps_link ?? "",
        }
      : undefined,
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      return updateRestaurantByUserId(data);
    },
    onSuccess: () => {
      toast.success("Informations de localisation mises à jour avec succès!"),
        queryClient.invalidateQueries({
          queryKey: ["restaurant", "user", user?.id],
        });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Erreur lors de la mise à jour.");
    },
  });

  const onSubmit = (data: FormData) => {
    const cleanedData = {
      address: data.address,
      postal_code: data.postal_code,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      google_maps_link: data.google_maps_link || undefined,
    };

    mutation.mutate(cleanedData);
  };

  if (isLoading || !isLoaded) {
    return <div>Chargement...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input placeholder="123 Rue de la Paix" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code postal</FormLabel>
                <FormControl>
                  <Input placeholder="75001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville</FormLabel>
                <FormControl>
                  <Input placeholder="Paris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Coordinates Section */}
        {/* <div className="space-y-4">
          <h3 className="text-lg font-medium">Coordonnées GPS (optionnel)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Navigation className="h-4 w-4" />
                    Latitude
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder="48.8566"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : parseFloat(value)
                        );
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Navigation className="h-4 w-4" />
                    Longitude
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="any"
                      placeholder="2.3522"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : parseFloat(value)
                        );
                      }}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div> */}

        {/* <div className="space-y-4">
          <h3 className="text-lg font-medium">Lien Google Maps (optionnel)</h3>

          <FormField
            control={form.control}
            name="google_maps_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-blue-600" />
                  Lien Google Maps
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://maps.google.com/..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </Form>
  );
};

export default LocationForm;
