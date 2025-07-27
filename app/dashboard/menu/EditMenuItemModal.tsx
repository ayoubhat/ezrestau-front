"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { updateMenuItem } from "@/actions/update-restaurant-menu";
import { MenuCategory, MenuItem } from "@/types";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Le nom du plat est requis"),
  description: z.string().optional(),
  price: z.number().min(0.01, "Le prix doit être supérieur à 0"),
  category: z.string().min(1, "La catégorie est requise"),
  image_url: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EditMenuItemModalProps {
  categories: MenuCategory[];
  item: MenuItem;
  categoryName: string;
  itemIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditMenuItemModal = ({
  categories,
  item,
  categoryName,
  itemIndex,
  open,
  onOpenChange,
}: EditMenuItemModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      description: item.description || "",
      price: item.price,
      category: categoryName,
    },
  });

  // Set image preview when modal opens with existing item
  useEffect(() => {
    if (open && item.image_url) {
      setImagePreview(item.image_url);
    } else if (!open) {
      setImagePreview(null);
      form.reset();
    }
  }, [open, item, form]);

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      const { image_url, category, ...itemData } = data;
      return updateMenuItem(category, itemIndex, itemData, image_url);
    },
    onSuccess: () => {
      toast.success("Plat mis à jour avec succès!");
      queryClient.invalidateQueries({ queryKey: ["restaurant"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erreur lors de la mise à jour du plat.");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image_url", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    form.setValue("image_url", undefined);
    setImagePreview(item.image_url || null);  
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le plat</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du plat</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Pizza Margherita" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex: Sauce tomate, mozzarella, basilic frais..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="12.50"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category, index) => (
                        <SelectItem key={index} value={category.category}>
                          {category.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={() => (
                <FormItem>
                  <FormLabel>Image du plat (optionnel)</FormLabel>
                  <FormControl>
                    <div>
                      {imagePreview ? (
                        <div className="relative inline-block">
                          <Image
                            src={imagePreview}
                            alt="Image preview"
                            className="w-32 h-32 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={removeImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-sm p-6 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <div className="mt-2">
                            <label
                              htmlFor="edit-image-upload"
                              className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                              Cliquez pour télécharger une image
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG, GIF jusqu&apos;à 10MB
                            </p>
                          </div>
                        </div>
                      )}
                      <input
                        id="edit-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Mise à jour..." : "Mettre à jour"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenuItemModal;
