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
import { getRestaurantById } from "@/actions/get-restaurant-by-id";
import { updateRestaurant } from "@/actions/update-restaurant";
import { useUser } from "@clerk/nextjs";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";

const formSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  social_links: z
    .object({
      facebook: z
        .string()
        .url("URL Facebook invalide")
        .optional()
        .or(z.literal("")),
      instagram: z
        .string()
        .url("URL Instagram invalide")
        .optional()
        .or(z.literal("")),
      tiktok: z
        .string()
        .url("URL TikTok invalide")
        .optional()
        .or(z.literal("")),
      twitter: z
        .string()
        .url("URL Twitter invalide")
        .optional()
        .or(z.literal("")),
      linkedin: z
        .string()
        .url("URL LinkedIn invalide")
        .optional()
        .or(z.literal("")),
      youtube: z
        .string()
        .url("URL YouTube invalide")
        .optional()
        .or(z.literal("")),
    })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
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
      phone: restaurant?.phone ?? "",
      email: restaurant?.email ?? "",
      social_links: {
        facebook: restaurant?.social_links?.facebook ?? "",
        instagram: restaurant?.social_links?.instagram ?? "",
        tiktok: restaurant?.social_links?.tiktok ?? "",
        twitter: restaurant?.social_links?.twitter ?? "",
        linkedin: restaurant?.social_links?.linkedin ?? "",
        youtube: restaurant?.social_links?.youtube ?? "",
      },
    },
    values: restaurant
      ? {
          phone: restaurant.phone ?? "",
          email: restaurant.email ?? "",
          social_links: {
            facebook: restaurant.social_links?.facebook ?? "",
            instagram: restaurant.social_links?.instagram ?? "",
            tiktok: restaurant.social_links?.tiktok ?? "",
            twitter: restaurant.social_links?.twitter ?? "",
            linkedin: restaurant.social_links?.linkedin ?? "",
            youtube: restaurant.social_links?.youtube ?? "",
          },
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
      toast.success("Informations de contact mises à jour avec succès!"),
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
      phone: data.phone,
      email: data.email,
      social_links:
        data.social_links &&
        Object.values(data.social_links).some((value) => value)
          ? Object.fromEntries(
              Object.entries(data.social_links).filter(([_, value]) => value)
            )
          : undefined,
    };

    mutation.mutate(cleanedData);
  };

  if (isLoading || !isLoaded) {
    return <div>Chargement...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informations de contact</h3>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="+33 1 23 45 67 89" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="contact@monrestaurant.fr"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Réseaux sociaux</h3>

          <FormField
            control={form.control}
            name="social_links.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://facebook.com/monrestaurant"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social_links.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://instagram.com/monrestaurant"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social_links.tiktok"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TikTok</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://tiktok.com/@monrestaurant"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social_links.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter / X</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/monrestaurant"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social_links.linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/company/monrestaurant"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social_links.youtube"
            render={({ field }) => (
              <FormItem>
                <FormLabel>YouTube</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://youtube.com/@monrestaurant"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
