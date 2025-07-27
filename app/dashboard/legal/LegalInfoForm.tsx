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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { formatSiret } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";

const formSchema = z.object({
  raison_sociale: z.string().optional(),
  forme_juridique: z.string().optional(),
  siret: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{14}$/.test(val.replace(/\s/g, "")),
      "Le SIRET doit contenir 14 chiffres"
    ),
});

type FormData = z.infer<typeof formSchema>;

const formes_juridiques = [
  { value: "SARL", label: "Société à Responsabilité Limitée (SARL)" },
  { value: "SAS", label: "Société par Actions Simplifiée (SAS)" },
  {
    value: "SASU",
    label: "Société par Actions Simplifiée Unipersonnelle (SASU)",
  },
  {
    value: "EURL",
    label: "Entreprise Unipersonnelle à Responsabilité Limitée (EURL)",
  },
  { value: "SA", label: "Société Anonyme (SA)" },
  { value: "SNC", label: "Société en Nom Collectif (SNC)" },
  { value: "Auto-entrepreneur", label: "Auto-entrepreneur / Micro-entreprise" },
  { value: "EI", label: "Entreprise Individuelle (EI)" },
  {
    value: "EIRL",
    label: "Entreprise Individuelle à Responsabilité Limitée (EIRL)",
  },
];

const LegalInfoForm = () => {
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
      raison_sociale: "",
      forme_juridique: "",
      siret: "",
    },
    values: restaurant?.legal_info
      ? {
          raison_sociale: restaurant.legal_info.raison_sociale || "",
          forme_juridique: restaurant.legal_info.forme_juridique || "",
          siret: restaurant.legal_info.siret || "",
        }
      : undefined,
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      const payload = {
        legal_info: {
          ...(data.raison_sociale && { raison_sociale: data.raison_sociale }),
          ...(data.forme_juridique && {
            forme_juridique: data.forme_juridique,
          }),
          ...(data.siret && { siret: data.siret.replace(/\s/g, "") }),
        },
      };

      return updateRestaurantByUserId(payload);
    },
    onSuccess: () => {
      toast.success("Informations légales mises à jour avec succès!");
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
          name="raison_sociale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raison sociale</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Restaurant Le Gourmet SARL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="siret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro SIRET</FormLabel>
              <FormControl>
                <Input
                  placeholder="123 456 789 12345"
                  value={field.value}
                  onChange={(e) => {
                    const formatted = formatSiret(e.target.value);
                    field.onChange(formatted);
                  }}
                  maxLength={17}
                />
              </FormControl>
              <p className="text-xs text-gray-500">
                Le numéro SIRET doit contenir 14 chiffres
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="forme_juridique"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forme juridique</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une forme juridique" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {formes_juridiques.map((forme) => (
                    <SelectItem key={forme.value} value={forme.value}>
                      {forme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default LegalInfoForm;
