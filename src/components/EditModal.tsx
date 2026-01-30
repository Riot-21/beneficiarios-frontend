import { beneficiarioSchema, type BeneficiarioForm } from "../interfaces/beneficiario.schema";
import { AnimatedModal } from "./custom/AnimatedModal";
import type { DocumentoResponse } from "../interfaces/documento-response.interface";
import { CreateForm } from "./CreateForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type EditPostModalProps = {
  benefId: number | null;
  benef: BeneficiarioForm | null; 
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BeneficiarioForm) => void;
  documentos: DocumentoResponse[];
  docLoading: boolean;
  documentSelected: DocumentoResponse | null;
  setDocumentSelected: (doc: DocumentoResponse | null) => void;
};


export const EditModal = ({
  benefId,
  benef,
  isOpen,
  onClose,
  onSubmit,
  documentos,
  docLoading,
  documentSelected,
  setDocumentSelected,
}: EditPostModalProps) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BeneficiarioForm>({
    resolver: zodResolver(beneficiarioSchema),
  });

useEffect(() => {
  if (isOpen && benef) {
    reset(benef);
  }
}, [isOpen, benef, reset]);

  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-cyan-900 text-lg">Editar Beneficiario - ID: {benefId}</h2>

      <CreateForm
        onSubmit={onSubmit}
        onCancel={onClose}
        reset={reset}
        isSubmitting={isSubmitting}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        documentos={documentos}
        docLoading={docLoading}
        documentSelected={documentSelected}
        setDocumentSelected={setDocumentSelected}
        submitLabel="Guardar cambios"
      />
    </AnimatedModal>
  );
};

