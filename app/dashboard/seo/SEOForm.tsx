"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
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
import { Textarea } from "@/components/ui/textarea";
import { getCharacterCountColor } from "@/lib/utils";
import { toast } from "sonner";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";
import TipCard from "@/components/TipCard";

const seoFormSchema = z.object({
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});

type SEOFormData = z.infer<typeof seoFormSchema>;

const SEOForm = () => {
  const queryClient = useQueryClient();
  const { user, isLoaded } = useUser();

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });

  const form = useForm<SEOFormData>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      seo_title: restaurant?.seo_title ?? "",
      seo_description: restaurant?.seo_description ?? "",
    },
    values: restaurant
      ? {
          seo_title: restaurant.seo_title ?? "",
          seo_description: restaurant.seo_description ?? "",
        }
      : undefined,
  });

  // Watch SEO fields for character counting
  const seoTitle = form.watch("seo_title") || "";
  const seoDescription = form.watch("seo_description") || "";

  const mutation = useMutation({
    mutationFn: async (data: SEOFormData) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }
      return updateRestaurantByUserId(data);
    },
    onSuccess: () => {
      toast.success("SEO mis à jour avec succès!");
      queryClient.invalidateQueries({
        queryKey: ["restaurant", "user", user?.id],
      });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Erreur lors de la mise à jour du SEO.");
    },
  });

  const onSubmit = (data: SEOFormData) => {
    mutation.mutate(data);
  };

  if (isLoading || !isLoaded) {
    return <div>Chargement...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="seo_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre SEO</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex : Pizzeria Roma - Pizza Authentique à Lyon"
                  {...field}
                  maxLength={70}
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  Le titre qui apparaîtra dans les résultats de recherche
                  (Recommandé: 50-60 caractères)
                </p>
                <span
                  className={`text-xs font-medium ${getCharacterCountColor(
                    seoTitle.length,
                    70,
                    50
                  )}`}
                >
                  {seoTitle.length}/70
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seo_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description SEO</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="ex : Découvrez nos délicieuses pizzas artisanales préparées avec des ingrédients frais et locaux. Commandez en ligne et profitez de la livraison rapide à Lyon."
                  {...field}
                  maxLength={180}
                  rows={3}
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  La description qui apparaîtra sous le titre dans les résultats
                  de recherche (Recommandé: 150-160 caractères)
                </p>
                <span
                  className={`text-xs font-medium ${getCharacterCountColor(
                    seoDescription.length,
                    180,
                    150
                  )}`}
                >
                  {seoDescription.length}/180
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </Form>
  );
};

export default SEOForm;
