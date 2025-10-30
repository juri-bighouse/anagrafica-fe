import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getPersonaById } from "../api/personeApi";
import { addResidenza, updateResidenza } from "../api/residenzeApi";

export const usePersonaDettaglio = (personaId) => {
  const queryClient = useQueryClient();

  const { data: persona, isLoading } = useQuery({
    queryKey: ["persona", personaId],
    queryFn: () => getPersonaById(personaId),
  });

  const addMutation = useMutation({
    mutationFn: (residenza) => addResidenza(personaId, residenza),
    onSuccess: () => {
      toast.success("Residenza aggiunta!");
      queryClient.invalidateQueries(["persona", personaId]);
    },
    onError: () => toast.error("Errore durante l'aggiunta della residenza."),
  });

  const updateMutation = useMutation({
    mutationFn: (residenza) => updateResidenza(personaId, residenza),
    onSuccess: () => {
      toast.success("Residenza aggiornata!");
      queryClient.invalidateQueries(["persona", personaId]);
    },
    onError: () => toast.error("Errore durante l'aggiornamento."),
  });

  return {
    persona,
    isLoading,
    addResidenza: addMutation.mutate,
    updateResidenza: updateMutation.mutate,
  };
};
