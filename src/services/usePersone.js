import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getPersone,
  createPersona,
  deletePersona,
  getPersoneByIndirizzo,
} from "../api/personeApi";

export const usePersone = () => {
  const queryClient = useQueryClient();

  const { data: persone = [], isLoading } = useQuery({
    queryKey: ["persone"],
    queryFn: getPersone,
  });

  const addPersonaMutation = useMutation({
    mutationFn: createPersona,
    onSuccess: () => {
      toast.success("Persona aggiunta con successo!");
      queryClient.invalidateQueries(["persone"]);
    },
    onError: () => toast.error("Errore durante l'aggiunta della persona."),
  });

  const deletePersonaMutation = useMutation({
    mutationFn: deletePersona,
    onSuccess: () => {
      toast.success("Persona eliminata!");
      queryClient.invalidateQueries(["persone"]);
    },
    onError: () => toast.error("Errore durante l'eliminazione."),
  });

  const usePersoneByAddress = (indirizzo) => {
    return useQuery({
      queryKey: ["personeByIndirizzo", indirizzo],
      queryFn: () => getPersoneByIndirizzo(indirizzo),
      enabled: !!indirizzo,
      staleTime: 1000 * 60 * 2,
    });
  };

  return {
    persone,
    usePersoneByAddress,
    isLoading,
    addPersona: addPersonaMutation.mutate,
    deletePersona: deletePersonaMutation.mutate,
  };
};
