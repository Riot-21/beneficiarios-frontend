import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBeneficiariosAction } from "../actions/get-beneficiarios.action";
import { createBeneficiarioAction } from "../actions/create-beneficiario.action";
import { updateBeneficiarioAction } from "../actions/update-beneficiario.action";
import { deleteBenefAction } from "../actions/delete-beneficiario.action";
import { getById } from "../actions/get-benef-by-id.action";

export const useBeneficiarios = () => {
  return useQuery({
    queryKey: ["beneficiarios"],
    queryFn: getBeneficiariosAction,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBeneficiarioById = (id: number | null) => {
  return useQuery({
    queryKey: ["beneficiarios", {id}],
    queryFn: () => getById(id as number),
    enabled: id !== null,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateBenef = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBeneficiarioAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beneficiarios"] });
    },
  });

  return { mutation };
};

export const useUpdateBenef = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateBeneficiarioAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beneficiarios"] });
    },
  });
  return { mutation };
};

export const useDeleteBenef = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBenefAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beneficiarios"] });
    },
  });
  return { mutation };
};
