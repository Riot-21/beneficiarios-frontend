import { dbApi } from "../api/dbApi";

export const deleteBenefAction = async (id: number): Promise<void> => {
    await dbApi.delete<void>(`/Beneficiarios/${id}`);
};