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
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  FaWheelchair,
  FaDog,
  FaCalendarAlt,
  FaUtensils,
  FaParking,
  FaLeaf,
  FaWifi,
  FaCheck,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { BiSolidHomeHeart } from "react-icons/bi";
import { MdDeliveryDining, MdTableRestaurant } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { useUser } from "@clerk/nextjs";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";

const formSchema = z.object({
  services: z.array(z.string()).min(0, "Sélectionnez au moins un service"),
});

type FormData = z.infer<typeof formSchema>;

interface Service {
  label: string;
}

const iconMap: Record<string, React.ReactNode> = {
  "Accès mobilité réduite": <FaWheelchair className="w-7 h-7" />,
  "Accueil groupes": <FaPeopleGroup className="w-7 h-7" />,
  "Animaux domestiques autorisés": <FaDog className="w-7 h-7" />,
  "À emporter": <IoFastFoodSharp className="w-7 h-7" />,
  "Événements privés": <FaCalendarAlt className="w-7 h-7" />,
  "Fait maison": <BiSolidHomeHeart className="w-7 h-7" />,
  Livraison: <MdDeliveryDining className="w-7 h-7" />,
  "Sur place": <FaUtensils className="w-7 h-7" />,
  "Parking réservé": <FaParking className="w-7 h-7" />,
  "Produits locaux": <FaLeaf className="w-7 h-7" />,
  "Terrasse extérieure": <MdTableRestaurant className="w-7 h-7" />,
  "Wi-Fi gratuit": <FaWifi className="w-7 h-7" />,
  Halal: <FaCheck className="w-7 h-7" />,
  Climatisation: <TbAirConditioning className="w-7 h-7" />,
};

const services: Service[] = [
  { label: "À emporter" },
  { label: "Livraison" },
  { label: "Sur place" },
  { label: "Fait maison" },
  { label: "Halal" },
  { label: "Wi-Fi gratuit" },
  { label: "Accès mobilité réduite" },
  { label: "Accueil groupes" },
  { label: "Animaux domestiques autorisés" },
  { label: "Événements privés" },
  { label: "Parking réservé" },
  { label: "Produits locaux" },
  { label: "Terrasse extérieure" },
  { label: "Climatisation" },
];

const ServicesForm = () => {
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
      services: restaurant?.services ?? [],
    },
    values: restaurant
      ? {
          services: restaurant.services ?? [],
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
      toast.success("Services mis à jour avec succès!"),
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

  const toggleService = (serviceLabel: string) => {
    const currentServices = form.getValues("services");
    const isSelected = currentServices.includes(serviceLabel);

    if (isSelected) {
      form.setValue(
        "services",
        currentServices.filter((service) => service !== serviceLabel)
      );
    } else {
      form.setValue("services", [...currentServices, serviceLabel]);
    }
  };

  if (isLoading || !isLoaded) {
    return <div>Chargement...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {services.map((service) => {
                    const isSelected = field.value.includes(service.label);
                    return (
                      <div
                        key={service.label}
                        className={cn(
                          "relative cursor-pointer transition-all duration-200 rounded-lg border-2",
                          isSelected
                            ? "border-green-500 bg-green-50 scale-[1.02]"
                            : "border-gray-200 bg-gray-50/50 opacity-60 hover:opacity-80 hover:border-gray-300"
                        )}
                        onClick={() => toggleService(service.label)}
                      >
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <FaCheck className="w-3 h-3 text-white" />
                          </div>
                        )}

                        <div className="p-5 text-center">
                          <div className="flex flex-col items-center space-y-3">
                            <div
                              className={cn(
                                "transition-colors duration-200",
                                isSelected ? "text-green-600" : "text-gray-400"
                              )}
                            >
                              {iconMap[service.label]}
                            </div>
                            <span
                              className={cn(
                                "text-sm font-medium text-center leading-tight",
                                isSelected
                                  ? "text-green-700 font-semibold"
                                  : "text-gray-500"
                              )}
                            >
                              {service.label}
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

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>
    </Form>
  );
};

export default ServicesForm;
