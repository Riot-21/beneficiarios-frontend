import { dbApi } from "../api/dbApi";
import type { BeneficiarioResponse } from "../interfaces/beneficiario-response.interface";

export const getBeneficiariosAction = async (): Promise<BeneficiarioResponse[]> => {
    const { data } = await dbApi.get<BeneficiarioResponse[]>("/Beneficiarios");
    return data;
}