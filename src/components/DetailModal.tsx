import type { BeneficiarioResponse } from "../interfaces/beneficiario-response.interface";
import { formatDate } from "./BeneficiariosList";
import { AnimatedModal } from "./custom/AnimatedModal";

type DetailPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  benef: BeneficiarioResponse | null;
  loading: boolean;
};

export const DetailModal = ({
  isOpen,
  onClose,
  benef,
  loading,
}: DetailPostModalProps) => {
  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Detalle del Beneficiario</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : benef ? (
        <div className="space-y-3">
          <p>
            <strong>ID:</strong> {benef.id}
          </p>
          <p>
            <strong>Nombres:</strong> {benef.nombres}
          </p>
          <p>
            <strong>Apellidos:</strong> {benef.apellidos}
          </p>
          <p>
            <strong>Numero de documento:</strong> {benef.numeroDocumento}
          </p>
          <p>
            <strong>Fecha de nacimiento:</strong>{" "}
            {formatDate(benef.fechaNacimiento)}
          </p>
          <p>
            <strong>Sexo:</strong> {benef.sexo}
          </p>
        </div>
      ) : (
        <p>No se encontró información del beneficiario.</p>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cerrar
        </button>
      </div>
    </AnimatedModal>
  );
};
