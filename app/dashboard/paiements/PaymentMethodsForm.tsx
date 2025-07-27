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
  FaCheck,
  FaMoneyBillWave,
  FaCreditCard,
  FaUtensils,
  FaTicketAlt,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { getRestaurantByUserId } from "@/actions/get-restaurant-by-user-id";
import { updateRestaurantByUserId } from "@/actions/update-restaurant-by-user-id";

const formSchema = z.object({
  payments_accepted: z
    .array(z.string())
    .min(1, "Sélectionnez au moins un moyen de paiement"),
});

type FormData = z.infer<typeof formSchema>;

interface PaymentMethod {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const paymentMethods: PaymentMethod[] = [
  {
    value: "Espèces",
    label: "Espèces",
    icon: <FaMoneyBillWave className="w-7 h-7" />,
  },
  {
    value: "Carte bleue",
    label: "Carte bleue",
    icon: <FaCreditCard className="w-7 h-7" />,
  },
  {
    value: "Paiement sans contact",
    label: "Paiement sans contact",
    icon: <FaUmbrellaBeach className="w-7 h-7" />,
  },
  {
    value: "Tickets restaurant",
    label: "Tickets restaurant",
    icon: <FaUtensils className="w-7 h-7" />,
  },
  {
    value: "Carte ticket restaurant",
    label: "Carte ticket restaurant",
    icon: <FaTicketAlt className="w-7 h-7" />,
  },
  {
    value: "Chèques vacances",
    label: "Chèques vacances",
    icon: <FaUmbrellaBeach className="w-7 h-7" />,
  },
];

const PaymentMethodsForm = () => {
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
      payments_accepted: restaurant?.payments_accepted ?? [],
    },
    values: restaurant
      ? {
          payments_accepted: restaurant.payments_accepted ?? [],
        }
      : undefined,
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      return updateRestaurantByUserId(data);
    },
    onSuccess: () => {
      toast.success("Moyens de paiement mis à jour avec succès!");
      queryClient.invalidateQueries({
        queryKey: ["restaurant", "user", user?.id],
      });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Erreur lors de la mise à jour.");
    },
  });

  const togglePaymentMethod = (paymentMethod: string) => {
    const currentMethods = form.getValues("payments_accepted");
    const isSelected = currentMethods.includes(paymentMethod);

    if (isSelected) {
      form.setValue(
        "payments_accepted",
        currentMethods.filter((method) => method !== paymentMethod)
      );
    } else {
      form.setValue("payments_accepted", [...currentMethods, paymentMethod]);
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
          name="payments_accepted"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {paymentMethods.map((method) => {
                    const isSelected = field.value.includes(method.value);
                    return (
                      <div
                        key={method.value}
                        className={cn(
                          "relative cursor-pointer transition-all duration-200 rounded-lg border-2",
                          isSelected
                            ? "border-green-500 bg-green-50 scale-[1.02]"
                            : "border-gray-200 bg-gray-50/50 opacity-60 hover:opacity-80 hover:border-gray-300"
                        )}
                        onClick={() => togglePaymentMethod(method.value)}
                      >
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <FaCheck className="w-3 h-3 text-white" />
                          </div>
                        )}

                        <div className="p-5 text-center">
                          <div className="flex flex-col items-center space-y-3">
                            <span
                              className={cn(
                                "text-sm font-medium text-center leading-tight",
                                isSelected
                                  ? "text-green-700 font-semibold"
                                  : "text-gray-500"
                              )}
                            >
                              {method.label}
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

export default PaymentMethodsForm;
