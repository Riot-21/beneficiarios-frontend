import { dbApi } from "../api/dbApi";
import type { BeneficiarioResponse } from "../interfaces/beneficiario-response.interface";
import { beneficiarioSchema, type BeneficiarioForm } from "../interfaces/beneficiario.schema";


export const createBeneficiarioAction = async (
  datos: BeneficiarioForm
): Promise<BeneficiarioResponse> => {
    const parsedData = beneficiarioSchema.safeParse(datos);
    if (!parsedData.success) {
      throw new Error("Datos invalidos");
    }
    const payload = {
      ...parsedData.data,
      fechaNacimiento: parsedData.data.fechaNacimiento
        .toISOString()
        .split("T")[0]
    }
    const { data } = await dbApi.post<BeneficiarioResponse>(
      "/Beneficiarios",
      payload
    );
    return data;
};