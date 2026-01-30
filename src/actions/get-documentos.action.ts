import { dbApi } from "../api/dbApi";
import type { DocumentoResponse } from "../interfaces/documento-response.interface";

export const getDocumentosAction = async (): Promise<DocumentoResponse[]> => {
    const { data } = await dbApi.get<DocumentoResponse[]>("/Documentos");
    return data;
}