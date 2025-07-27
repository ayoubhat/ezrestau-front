"use client";

import { useState } from "react";
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
import { Upload } from "lucide-react";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";

const formSchema = z.object({
  name: z.string().min(1, "Le nom du restaurant est requis"),
  subdomain: z.string().min(1, "Le nom de domaine est requis"),
  logo_url: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

const ConfigurationForm = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { user, isLoaded } = useUser();

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: restaurant?.name ?? "",
      subdomain: restaurant?.subdomain ?? "",
    },
    values: restaurant
      ? {
          name: restaurant.name ?? "",
          subdomain: restaurant.subdomain ?? "",
        }
      : undefined,
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }
      const { logo_url, ...rest } = data;
      return updateRestaurantByUserId(rest, logo_url);
    },
    onSuccess: () => {
      toast.success("Restaurant mis à jour avec succès!");
      queryClient.invalidateQueries({
        queryKey: ["restaurant", "user", user?.id],
      });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Erreur lors de la mise à jour.");
    },
  });

  const handleRestaurantNameChange = (value: string) => {
    const subdomain = slugify(value);
    form.setValue("subdomain", subdomain);
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("logo_url", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById(
      "logo-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  if (isLoading || !isLoaded) {
    return <div>Chargement...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du restaurant</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mon Restaurant"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleRestaurantNameChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subdomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de domaine (adresse de votre site)</FormLabel>
              <FormControl>
                <div className="flex items-center border border-input rounded-sm bg-background">
                  <div className="px-3 py-2 text-sm text-muted-foreground bg-muted border-r">
                    https://
                  </div>
                  <Input
                    placeholder="mon-restaurant"
                    {...field}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className="px-3 py-2 text-sm text-muted-foreground bg-muted border-l">
                    .ezrestau.fr
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo du restaurant</FormLabel>
              <FormControl>
                <div>
                  {logoPreview || restaurant?.logo_url ? (
                    <div className="relative inline-block">
                      <img
                        src={logoPreview ?? restaurant?.logo_url ?? undefined}
                        alt="Logo preview"
                        className="w-32 h-32 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={triggerFileInput}
                        title="Cliquez pour changer le logo"
                      />
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-sm p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      onClick={triggerFileInput}
                    >
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                          Cliquez pour télécharger un logo
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF jusqu'à 10MB
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </div>
              </FormControl>
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

export default ConfigurationForm;
