import { dbApi } from "../api/dbApi";
import type { BeneficiarioResponse } from "../interfaces/beneficiario-response.interface";

export const getById = async (id: number): Promise<BeneficiarioResponse> => {
  const { data } = await dbApi.get<BeneficiarioResponse>(
    `/Beneficiarios/${id}`,
  );
  return data;
};
