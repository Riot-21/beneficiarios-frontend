import { AnimatedModal } from "./custom/AnimatedModal";

type ConfirmDialogProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
};

export const ConfirmDialog = ({
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
  message = "¿Estás seguro de eliminar este registro?",
}: ConfirmDialogProps) => {
  return (
    <AnimatedModal isOpen={isOpen} onClose={onCancel}>
      <div className="flex flex-col items-center text-center gap-6 w-full">
        <p className="text-gray-800 font-medium text-center">{message}</p>

        <div className="flex justify-center gap-3 w-full">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            {isLoading ? "Eliminando..." : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </AnimatedModal>
  );
};
