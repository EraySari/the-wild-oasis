import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSettings() {
  const clientQuery = useQueryClient();
  const { isLoading: isSettingsEdit, mutate: settingsEditMutate } = useMutation(
    {
      mutationFn: updateSetting,
      onError: (err) => {
        console.error(err);
        throw new Error(err);
      },
      onSuccess: () => {
        clientQuery.invalidateQueries({ key: ["settings"] });

        toast.success("Settings has updated");
      },
    }
  );
  return { isSettingsEdit, settingsEditMutate };
}
