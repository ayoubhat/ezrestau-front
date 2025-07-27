"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteMenuItem } from "@/actions/update-restaurant-menu";
import { MenuItem } from "@/actions/get-restaurant-by-id";

interface DeleteMenuItemDialogProps {
  item: MenuItem;
  categoryName: string;
  itemIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteMenuItemDialog = ({
  item,
  categoryName,
  itemIndex,
  open,
  onOpenChange,
}: DeleteMenuItemDialogProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteMenuItem(categoryName, itemIndex),
    onSuccess: () => {
      toast.success("Plat supprimé avec succès!");
      queryClient.invalidateQueries({ queryKey: ["restaurant"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erreur lors de la suppression du plat.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer le plat</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer "{item.name}" ? Cette action est
            irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMenuItemDialog;
