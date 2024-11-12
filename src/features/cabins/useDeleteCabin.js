import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const clientQueries = useQueryClient();

  // eslint-disable-next-line no-unused-vars
  const { isLoading: isDeleting, mutate: deleteMutate } = useMutation({
    mutationFn: deleteCabin,
    onError: (err) => {
      alert(err.message);
    },
    onSuccess: () => {
      clientQueries.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin has successfully deleted");
    },
  });

  return { isDeleting, deleteMutate };
}
