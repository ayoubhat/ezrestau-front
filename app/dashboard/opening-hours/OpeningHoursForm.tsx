"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";
import WorkingHoursInput from "../_components/WorkingHoursInputs";

const timeSlotSchema = z.object({
  open: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format: HH:MM"),
  close: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format: HH:MM"),
});

const daySchema = z.array(timeSlotSchema).optional();

const formSchema = z.object({
  opening_hours: z.object({
    lundi: daySchema,
    mardi: daySchema,
    mercredi: daySchema,
    jeudi: daySchema,
    vendredi: daySchema,
    samedi: daySchema,
    dimanche: daySchema,
  }),
});

type FormData = z.infer<typeof formSchema>;

const OpeningHoursForm = () => {
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
      opening_hours: {
        lundi: [],
        mardi: [],
        mercredi: [],
        jeudi: [],
        vendredi: [],
        samedi: [],
        dimanche: [],
      },
    },
    values: restaurant?.opening_hours
      ? {
          opening_hours: {
            lundi: restaurant.opening_hours.lundi || [],
            mardi: restaurant.opening_hours.mardi || [],
            mercredi: restaurant.opening_hours.mercredi || [],
            jeudi: restaurant.opening_hours.jeudi || [],
            vendredi: restaurant.opening_hours.vendredi || [],
            samedi: restaurant.opening_hours.samedi || [],
            dimanche: restaurant.opening_hours.dimanche || [],
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
      toast.success("Horaires d'ouverture mis à jour avec succès!");
      queryClient.invalidateQueries({
        queryKey: ["restaurant", "user", user?.id],
      });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Erreur lors de la mise à jour.");
    },
  });

  const handleToggleDay = (day: string, isOpen: boolean) => {
    if (isOpen) {
      // Set default time slots when opening
      form.setValue(`opening_hours.${day}` as any, [
        { open: "11:30", close: "22:30" },
      ]);
    } else {
      // Clear time slots when closing
      form.setValue(`opening_hours.${day}` as any, []);
    }
  };

  const handleAddTimeSlot = (day: string) => {
    const currentSlots = form.getValues(`opening_hours.${day}` as any) || [];
    const newSlots = [...currentSlots, { open: "09:00", close: "17:00" }];
    form.setValue(`opening_hours.${day}` as any, newSlots);
  };

  const handleRemoveTimeSlot = (day: string, index: number) => {
    const currentSlots = form.getValues(`opening_hours.${day}` as any) || [];
    const newSlots = currentSlots.filter((_: any, i: number) => i !== index);
    form.setValue(`opening_hours.${day}` as any, newSlots);
  };

  const handleUpdateTimeSlot = (
    day: string,
    index: number,
    field: "open" | "close",
    value: string
  ) => {
    const currentSlots = form.getValues(`opening_hours.${day}` as any) || [];
    const updatedSlots = currentSlots.map((slot: any, i: number) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    form.setValue(`opening_hours.${day}` as any, updatedSlots);
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  if (isLoading || !isLoaded) {
    return <div>Chargement...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <WorkingHoursInput
          type="opening"
          openingHours={form.watch("opening_hours")}
          onToggleDay={handleToggleDay}
          onAddTimeSlot={handleAddTimeSlot}
          onRemoveTimeSlot={handleRemoveTimeSlot}
          onUpdateTimeSlot={handleUpdateTimeSlot}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full sm:w-auto"
        >
          {mutation.isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </Form>
  );
};

export default OpeningHoursForm;
