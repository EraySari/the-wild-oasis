import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateEditCabin() {
  const clientQuery = useQueryClient();

  //neden create ve edit mutatelerini ayiriyoruz?
  //Cünkü editte createEditCabin'e id degeri de gitmesi gerekiyor.

  //useMutatoin fonksiyonunun faydalari, mutationFn veriyoruz
  //basarili olursa onSucces basarisiz olursa onError dönüyo ve heryerden cagirabiliriz

  //Create Mutate
  const { isLoading: isCreating, mutate: createMutate } = useMutation({
    //datayi degistiriyorsak useMutation kullanilir
    mutationFn: createEditCabin,
    onError: (err) => {
      console.log(err.message);
    },
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ["cabin"],
      });

      toast.success("New cabin successfully created!");
    },
  });

  //Edit Mutate
  const { isLoading: isEditing, mutate: editMutate } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id), //reactquery mutate fonksiyonu 1 argument kabul eder
    onError: (err) => {
      console.log(err.message);
    },
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ["cabin"],
      });

      toast.success("Cabin successfully edited!");
    },
  });

  return { isCreating, isEditing, editMutate, createMutate };
}
