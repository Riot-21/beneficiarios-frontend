import { dbApi } from "../api/dbApi";
import type { BeneficiarioResponse } from "../interfaces/beneficiario-response.interface";
import { beneficiarioSchema, type BeneficiarioForm } from "../interfaces/beneficiario.schema";

type updateBeneficiarioPayload = {
  id: number;
  datos: BeneficiarioForm;
};

export const updateBeneficiarioAction = async (
  { id, datos }: updateBeneficiarioPayload,
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
    console.log('update payload',payload)

  const { data } = await dbApi.put<BeneficiarioResponse>(
    `/Beneficiarios/${id}`,
    payload,
  );
  return data;
};