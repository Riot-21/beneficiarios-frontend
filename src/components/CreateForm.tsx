import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { Info } from "lucide-react";
import {
  sexoOptions,
  type BeneficiarioForm,
} from "../interfaces/beneficiario.schema";
import type { DocumentoResponse } from "../interfaces/documento-response.interface";

type Props = {
  onSubmit: (data: BeneficiarioForm) => void;
  onCancel?: () => void;
  isSubmitting: boolean;

  register: UseFormRegister<BeneficiarioForm>;
  handleSubmit: UseFormHandleSubmit<BeneficiarioForm>;
  reset: UseFormReset<BeneficiarioForm>;
  errors: FieldErrors<BeneficiarioForm>;

  documentos: DocumentoResponse[];
  docLoading: boolean;
  documentSelected: DocumentoResponse | null;
  setDocumentSelected: (doc: DocumentoResponse | null) => void;

  submitLabel: string;
};

export const CreateForm = ({
  onSubmit,
  isSubmitting,
  register,
  onCancel,
  handleSubmit,
  reset,
  errors,
  documentos,
  docLoading,
  documentSelected,
  setDocumentSelected,
  submitLabel,
}: Props) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="font-medium">Nombres</label>
        <input
          type="text"
          {...register("nombres")}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese los nombres"
        />
        {errors.nombres && (
          <p className="text-red-500 text-sm mt-1">{errors.nombres.message}</p>
        )}
      </div>

      <div>
        <label className="font-medium">Apellidos</label>
        <input
          type="text"
          {...register("apellidos")}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese los apellidos"
        />
        {errors.apellidos && (
          <p className="text-red-500 text-sm mt-1">
            {errors.apellidos.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-medium">Tipo de Documento</label>
        <select
          {...register("documentoIdentidadId", {
            setValueAs: (v) => Number(v),
            onChange: (e) => {
              const id = Number(e.target.value);
              const doc = documentos?.find((d) => d.id === id) || null;
              setDocumentSelected(doc);
            },
          })}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={docLoading}
        >
          <option value="">Selecciona un documento</option>
          {documentos?.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.nombre}
            </option>
          ))}
        </select>
        {errors.documentoIdentidadId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.documentoIdentidadId.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-medium">Número de Documento</label>
        <input
          type="text"
          {...register("numeroDocumento")}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese número de documento"
        />
        {errors.numeroDocumento && (
          <div>
            <p className="text-red-500 text-sm mt-1">
              {errors.numeroDocumento.message}
            </p>
            <div className="flex items-start gap-2 text-gray-700 text-sm mt-1">
              <Info size={16} className="mt-0.5" />
              <p>
                El número de {documentSelected?.abreviatura} debe tener{" "}
                {documentSelected?.longitud} dígitos exactos.{" "}
                {documentSelected?.soloNumeros
                  ? "Solo se permiten números."
                  : ""}
              </p>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="font-medium">Fecha de Nacimiento</label>
        <input
          type="date"
          {...register("fechaNacimiento", { valueAsDate: true })}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.fechaNacimiento && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fechaNacimiento.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-medium">Sexo</label>
        <select
          {...register("sexo")}
          className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona sexo</option>
          {sexoOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.sexo && (
          <p className="text-red-500 text-sm mt-1">{errors.sexo.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            reset();
            setDocumentSelected(null);
            onCancel?.();
          }}
          className="w-full border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-cyan-900 text-white font-semibold py-2 rounded-lg hover:bg-cyan-800 transition duration-200 cursor-pointer disabled:bg-cyan-600"
        >
          {isSubmitting ? "Guardando..." : submitLabel}
        </button>
      </div>
    </form>
  );
};
