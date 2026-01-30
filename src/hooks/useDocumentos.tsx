import { useQuery } from "@tanstack/react-query"
import { getDocumentosAction } from "../actions/get-documentos.action"

export const useDocumentos = () => {
    return useQuery({
        queryKey: ['documentos'],
        queryFn: getDocumentosAction,
        staleTime: 5 * 60 * 1000
    })
}