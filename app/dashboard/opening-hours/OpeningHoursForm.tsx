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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";

const timeSlotSchema = z.object({
  open: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format: HH:MM"),
  close: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format: HH:MM"),
});

const daySchema = z.array(timeSlotSchema).optional();

const formSchema = z.object({
  opening_hours: z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
  }),
});

type FormData = z.infer<typeof formSchema>;

const DAYS = [
  { key: "monday", label: "Lundi" },
  { key: "tuesday", label: "Mardi" },
  { key: "wednesday", label: "Mercredi" },
  { key: "thursday", label: "Jeudi" },
  { key: "friday", label: "Vendredi" },
  { key: "saturday", label: "Samedi" },
  { key: "sunday", label: "Dimanche" },
] as const;

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
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
    },
    values: restaurant?.opening_hours
      ? {
          opening_hours: {
            monday: restaurant.opening_hours.monday || [],
            tuesday: restaurant.opening_hours.tuesday || [],
            wednesday: restaurant.opening_hours.wednesday || [],
            thursday: restaurant.opening_hours.thursday || [],
            friday: restaurant.opening_hours.friday || [],
            saturday: restaurant.opening_hours.saturday || [],
            sunday: restaurant.opening_hours.sunday || [],
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

  const toggleDay = (day: keyof FormData["opening_hours"], isOpen: boolean) => {
    if (isOpen) {
      // Set default time slots when opening
      form.setValue(`opening_hours.${day}`, [
        { open: "11:30", close: "22:30" },
      ]);
    } else {
      // Clear time slots when closing
      form.setValue(`opening_hours.${day}`, []);
    }
  };

  const addTimeSlot = (day: keyof FormData["opening_hours"]) => {
    const currentSlots = form.getValues(`opening_hours.${day}`) || [];
    const newSlots = [...currentSlots, { open: "09:00", close: "17:00" }];
    form.setValue(`opening_hours.${day}`, newSlots);
  };

  const removeTimeSlot = (
    day: keyof FormData["opening_hours"],
    index: number
  ) => {
    const currentSlots = form.getValues(`opening_hours.${day}`) || [];
    const newSlots = currentSlots.filter((_, i) => i !== index);
    form.setValue(`opening_hours.${day}`, newSlots);
  };

  const updateTimeSlot = (
    day: keyof FormData["opening_hours"],
    index: number,
    field: "open" | "close",
    value: string
  ) => {
    const currentSlots = form.getValues(`opening_hours.${day}`) || [];
    const updatedSlots = currentSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );
    form.setValue(`opening_hours.${day}`, updatedSlots);
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
        <div className="bg-white rounded-lg border">
          {DAYS.map(({ key, label }, index) => {
            const daySlots = form.watch(`opening_hours.${key}`) || [];
            const isOpen = daySlots.length > 0;

            return (
              <div
                key={key}
                className={`p-3 sm:p-4 ${
                  index !== DAYS.length - 1 ? "border-b" : ""
                }`}
              >
                {/* Mobile layout - stacked vertically */}
                <div className="block sm:hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900 text-sm">
                      {label}
                    </span>
                    <FormField
                      control={form.control}
                      name={`opening_hours.${key}`}
                      render={() => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Switch
                              checked={isOpen}
                              onCheckedChange={(checked) =>
                                toggleDay(key, checked)
                              }
                            />
                          </FormControl>
                          {!isOpen && (
                            <FormLabel className="text-gray-500 font-normal text-sm">
                              Fermé
                            </FormLabel>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>

                  {isOpen && (
                    <div className="space-y-3">
                      {daySlots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              value={slot.open}
                              onChange={(e) =>
                                updateTimeSlot(
                                  key,
                                  slotIndex,
                                  "open",
                                  e.target.value
                                )
                              }
                              className="flex-1 min-w-0"
                            />
                            <span className="text-gray-500 text-sm px-1">
                              à
                            </span>
                            <Input
                              type="time"
                              value={slot.close}
                              onChange={(e) =>
                                updateTimeSlot(
                                  key,
                                  slotIndex,
                                  "close",
                                  e.target.value
                                )
                              }
                              className="flex-1 min-w-0"
                            />
                            {daySlots.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTimeSlot(key, slotIndex)}
                                className="p-1 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addTimeSlot(key)}
                        className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Ajouter une plage horaire
                      </Button>
                    </div>
                  )}
                </div>

                {/* Desktop layout - horizontal */}
                <div className="hidden sm:flex items-start justify-between">
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <span className="font-medium text-gray-900 min-w-[80px]">
                      {label}
                    </span>

                    <FormField
                      control={form.control}
                      name={`opening_hours.${key}`}
                      render={() => (
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <Switch
                              checked={isOpen}
                              onCheckedChange={(checked) =>
                                toggleDay(key, checked)
                              }
                            />
                          </FormControl>
                          <FormLabel className="text-gray-500 font-normal">
                            {isOpen ? "" : "Fermé"}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  {isOpen && (
                    <div className="flex-1 space-y-2">
                      {daySlots.map((slot, slotIndex) => (
                        <div
                          key={slotIndex}
                          className="flex items-center gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              value={slot.open}
                              onChange={(e) =>
                                updateTimeSlot(
                                  key,
                                  slotIndex,
                                  "open",
                                  e.target.value
                                )
                              }
                              className="w-[6.5rem]"
                            />
                            <span className="text-gray-500">à</span>
                            <Input
                              type="time"
                              value={slot.close}
                              onChange={(e) =>
                                updateTimeSlot(
                                  key,
                                  slotIndex,
                                  "close",
                                  e.target.value
                                )
                              }
                              className="w-[6.5rem]"
                            />
                          </div>
                          {daySlots.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTimeSlot(key, slotIndex)}
                              className="p-1 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addTimeSlot(key)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Ajouter une plage horaire
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

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
