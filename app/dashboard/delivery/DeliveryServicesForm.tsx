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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { FaCheck, FaStore } from "react-icons/fa";
import { Plus, Trash2 } from "lucide-react";
import { SiUbereats } from "react-icons/si";
import { SiDeliveroo } from "react-icons/si";
import { useUser } from "@clerk/nextjs";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";

const platformSchema = z.object({
  name: z.string(),
  url: z.string().url("URL invalide").optional().or(z.literal("")),
});

const formSchema = z.object({
  platforms: z
    .array(platformSchema)
    .min(1, "Sélectionnez au moins un service de livraison"),
  zones: z.array(z.string()).optional(),
  use_restaurant_hours: z.boolean(),
  delivery_hours: z.record(z.string(), z.array(z.string())).optional(),
});

type FormData = z.infer<typeof formSchema>;

const availablePlatforms = [
  {
    name: "livraison_du_restaurant",
    label: "Livraison du restaurant",
    icon: <FaStore className="w-7 h-7" />,
    needsUrl: false,
  },
  {
    name: "deliveroo",
    label: "Deliveroo",
    icon: <SiDeliveroo className="w-7 h-7" />,
    needsUrl: true,
  },
  {
    name: "uber_eats",
    label: "Uber Eats",
    icon: <SiUbereats className="w-7 h-7" />,
    needsUrl: true,
  },
];

const DAYS = [
  { key: "monday", label: "Lundi" },
  { key: "tuesday", label: "Mardi" },
  { key: "wednesday", label: "Mercredi" },
  { key: "thursday", label: "Jeudi" },
  { key: "friday", label: "Vendredi" },
  { key: "saturday", label: "Samedi" },
  { key: "sunday", label: "Dimanche" },
] as const;

const DeliveryServicesForm = () => {
  const { user, isLoaded } = useUser();

  const queryClient = useQueryClient();
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", "user", user?.id],
    queryFn: () => getRestaurantByUserId(user!.id),
    enabled: !!user?.id,
  });

  // Transform API data to form format
  const getFormDefaultValues = () => {
    if (!restaurant?.delivery_info) {
      return {
        platforms: [],
        zones: [],
        use_restaurant_hours: true,
        delivery_hours: {},
      };
    }

    const deliveryInfo = restaurant.delivery_info;

    // Transform platforms from API format to form format
    const platforms =
      deliveryInfo.platforms?.map((platform: unknown) => {
        if (typeof platform === "string") {
          // Handle case where platform is just a string
          return { name: platform, url: "" };
        } else if (
          typeof platform === "object" &&
          platform !== null &&
          "name" in platform
        ) {
          // Handle case where platform is an object with name and url
          return {
            name: (platform as { name: string; url?: string }).name,
            url: (platform as { name: string; url?: string }).url || "",
          };
        }
        return { name: platform, url: "" };
      }) || [];

    // Transform zones
    const zones = Array.isArray(deliveryInfo.zones) ? deliveryInfo.zones : [];

    // Check if delivery hours exist
    const hasDeliveryHours =
      deliveryInfo.delivery_hours &&
      Object.keys(deliveryInfo.delivery_hours).length > 0;

    // Ensure delivery_hours is Record<string, string[]>
    const normalizedDeliveryHours: Record<string, string[]> = {};
    if (deliveryInfo.delivery_hours) {
      Object.entries(deliveryInfo.delivery_hours).forEach(([day, value]) => {
        normalizedDeliveryHours[day] = Array.isArray(value) ? value : [value];
      });
    }

    return {
      platforms,
      zones,
      use_restaurant_hours: !hasDeliveryHours,
      delivery_hours: normalizedDeliveryHours,
    };
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platforms: [],
      zones: [],
      use_restaurant_hours: true,
      delivery_hours: {},
    },
    values: restaurant ? getFormDefaultValues() : undefined,
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }
      const payload = {
        delivery_info: {
          platforms: data.platforms,
          zones: (data.zones ?? []).filter((zone) => zone.trim() !== ""),
          ...(data.use_restaurant_hours
            ? {}
            : { delivery_hours: data.delivery_hours }),
        },
      };
      return updateRestaurantByUserId(payload);
    },
    onSuccess: () => {
      toast.success("Services de livraison mis à jour avec succès!");
      queryClient.invalidateQueries({
        queryKey: ["restaurant", "user", user?.id],
      });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Erreur lors de la mise à jour.");
    },
  });

  const selectedPlatforms = form.watch("platforms");
  const useRestaurantHours = form.watch("use_restaurant_hours");
  const deliveryZones = form.watch("zones");

  const isPlatformSelected = (platformName: string) => {
    return selectedPlatforms.some((p) => p.name === platformName);
  };

  const togglePlatform = (platformName: string, needsUrl: boolean) => {
    const currentPlatforms = form.getValues("platforms");
    const isSelected = isPlatformSelected(platformName);

    if (isSelected) {
      // Remove platform
      form.setValue(
        "platforms",
        currentPlatforms.filter((platform) => platform.name !== platformName)
      );
    } else {
      // Add platform
      form.setValue("platforms", [
        ...currentPlatforms,
        { name: platformName, url: needsUrl ? "" : undefined },
      ]);
    }
  };

  const updatePlatformUrl = (platformName: string, url: string) => {
    const currentPlatforms = form.getValues("platforms");
    const updatedPlatforms = currentPlatforms.map((platform) =>
      platform.name === platformName ? { ...platform, url } : platform
    );
    form.setValue("platforms", updatedPlatforms);
  };

  const getPlatformUrl = (platformName: string) => {
    const platform = selectedPlatforms.find((p) => p.name === platformName);
    return platform?.url || "";
  };

  const addZone = () => {
    const currentZones = form.getValues("zones");
    form.setValue("zones", [...(currentZones ?? []), ""]);
  };

  const removeZone = (index: number) => {
    const currentZones = form.getValues("zones");
    const newZones = (currentZones ?? []).filter((_, i) => i !== index);
    form.setValue("zones", newZones);
  };

  const updateZone = (index: number, value: string) => {
    const currentZones = form.getValues("zones");
    const updatedZones = (currentZones ?? []).map((zone, i) =>
      i === index ? value : zone
    );
    form.setValue("zones", updatedZones);
  };

  const formatTimeSlots = (slots: { open: string; close: string }[]) => {
    return slots.map((slot) => `${slot.open}-${slot.close}`);
  };

  const parseTimeSlots = (timeStrings: string[]) => {
    return timeStrings.map((timeString) => {
      const [open, close] = timeString.split("-");
      return { open, close };
    });
  };

  const toggleDay = (day: string, isOpen: boolean) => {
    const currentHours = form.getValues("delivery_hours") || {};
    if (isOpen) {
      form.setValue(`delivery_hours.${day}`, ["11:30-22:30"]);
    } else {
      const { [day]: _, ...rest } = currentHours;
      form.setValue("delivery_hours", rest);
    }
  };

  const addTimeSlot = (day: string) => {
    const currentHours = form.getValues("delivery_hours") || {};
    const currentSlots = Array.isArray(currentHours[day])
      ? currentHours[day]
      : [];
    const newSlots = [...currentSlots, "09:00-17:00"];
    form.setValue(`delivery_hours.${day}`, newSlots);
  };
  const removeTimeSlot = (day: string, index: number) => {
    const currentHours = form.getValues("delivery_hours") || {};
    const currentSlots = Array.isArray(currentHours[day])
      ? currentHours[day]
      : [];
    const newSlots = currentSlots.filter((_, i) => i !== index);

    if (newSlots.length === 0) {
      const { [day]: _, ...rest } = currentHours;
      form.setValue("delivery_hours", rest);
    } else {
      form.setValue(`delivery_hours.${day}`, newSlots);
    }
  };

  const updateTimeSlot = (
    day: string,
    index: number,
    field: "open" | "close",
    value: string
  ) => {
    const currentHours = form.getValues("delivery_hours") || {};
    const currentSlots = currentHours[day] || [];
    const parsedSlots = parseTimeSlots(
      Array.isArray(currentSlots) ? currentSlots : []
    );

    const updatedSlots = parsedSlots.map((slot, i) =>
      i === index ? { ...slot, [field]: value } : slot
    );

    form.setValue(`delivery_hours.${day}`, formatTimeSlots(updatedSlots));
  };

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  if (isLoading || !isLoaded) {
    return <div>Chargement...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="platforms"
          render={() => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Services de livraison proposés
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {availablePlatforms.map((platform) => {
                    const isSelected = isPlatformSelected(platform.name);
                    return (
                      <div
                        key={platform.name}
                        className={cn(
                          "relative cursor-pointer transition-all duration-200 rounded-lg border-2 p-6",
                          isSelected
                            ? "border-green-500 bg-green-50 scale-[1.02]"
                            : "border-gray-200 bg-gray-50/50 opacity-60 hover:opacity-80 hover:border-gray-300"
                        )}
                        onClick={() =>
                          togglePlatform(platform.name, platform.needsUrl)
                        }
                      >
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <FaCheck className="w-3 h-3 text-white" />
                          </div>
                        )}

                        <div className="text-center">
                          <div className="flex flex-col items-center space-y-3">
                            <div
                              className={cn(
                                "transition-colors duration-200",
                                isSelected ? "text-green-600" : "text-gray-400"
                              )}
                            >
                              {platform.icon}
                            </div>
                            <span
                              className={cn(
                                "text-sm font-medium text-center leading-tight",
                                isSelected
                                  ? "text-green-700 font-semibold"
                                  : "text-gray-500"
                              )}
                            >
                              {platform.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* URL Inputs for platforms that need URLs */}
        {availablePlatforms
          .filter(
            (platform) => platform.needsUrl && isPlatformSelected(platform.name)
          )
          .map((platform) => (
            <FormItem key={`${platform.name}_url`}>
              <FormLabel>Lien vers votre page {platform.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={`https://${
                    platform.name === "deliveroo"
                      ? "deliveroo.fr"
                      : "ubereats.com"
                  }/fr/...`}
                  value={getPlatformUrl(platform.name)}
                  onChange={(e) =>
                    updatePlatformUrl(platform.name, e.target.value)
                  }
                />
              </FormControl>
            </FormItem>
          ))}

        {/* Delivery Zones */}
        <FormField
          control={form.control}
          name="zones"
          render={() => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Zones de livraison
              </FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {deliveryZones?.map((zone, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Ex: Paris 11ème, Belleville, etc."
                        value={zone}
                        onChange={(e) => updateZone(index, e.target.value)}
                      />
                      {deliveryZones.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeZone(index)}
                          className="p-2 h-10 w-10 text-red-600 hover:text-red-700 hover:bg-red-50"
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
                    onClick={addZone}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter une zone
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Delivery Hours */}
        <FormField
          control={form.control}
          name="use_restaurant_hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Horaires de livraison
              </FormLabel>
              <div className="flex items-center space-x-3">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  Utiliser les mêmes horaires que le restaurant
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Custom Delivery Hours */}
        {!useRestaurantHours && (
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">
                Horaires de livraison personnalisés
              </h3>
            </div>
            {DAYS.map(({ key, label }, index) => {
              const deliveryHours = form.watch("delivery_hours") || {};
              const daySlots = Array.isArray(deliveryHours[key])
                ? deliveryHours[key]
                : [];
              const isOpen = daySlots.length > 0;
              const parsedSlots = parseTimeSlots(daySlots);

              return (
                <div
                  key={key}
                  className={`p-4 ${
                    index !== DAYS.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 min-w-[200px]">
                      <span className="font-medium text-gray-900 min-w-[80px]">
                        {label}
                      </span>

                      <div className="flex items-center gap-3">
                        <Switch
                          checked={isOpen}
                          onCheckedChange={(checked) => toggleDay(key, checked)}
                        />
                        {!isOpen && (
                          <span className="text-gray-500 font-normal">
                            Fermé
                          </span>
                        )}
                      </div>
                    </div>

                    {isOpen && (
                      <div className="flex-1 space-y-2">
                        {parsedSlots.map((slot, slotIndex) => (
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
                            {parsedSlots.length > 1 && (
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
        )}

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </Form>
  );
};

export default DeliveryServicesForm;
