import type { BeneficiarioResponse } from "../interfaces/beneficiario-response.interface";
import { Trash2, Pen, Eye } from "lucide-react";

type PostsTableProps = {
  beneficiarios: BeneficiarioResponse[];
  onEdit: (post: BeneficiarioResponse, id: number) => void;
  onDelete: (id: number) => void;
  onDetail: (id: number) => void;
  deleteLoading: boolean;
};

export const formatDate = (date: Date | string) => {
  const iso = typeof date === "string"
    ? date
    : date.toISOString();

  const [year, month, day] = iso.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};


export const BeneficiariosList = ({
  beneficiarios,
  onEdit,
  onDelete,
  onDetail,
  deleteLoading,
}: PostsTableProps) => {
  return (
    <table className="w-full border-collapse text-center">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-3 font-medium">ID</th>
          <th className="p-3 font-medium">Nombre</th>
          <th className="p-3 font-medium">Apellidos</th>
          <th className="p-3 font-medium">Fecha de nacimiento</th>
          <th className="p-3 font-medium w-32">Acciones</th>
        </tr>
      </thead>

      <tbody className="font-light">
        {beneficiarios.map((exp) => (
          <tr key={exp.id} className="border-b">
            <td className="p-3">{exp.id}</td>
            <td className="p-3">{exp.nombres}</td>
            <td className="p-3">{exp.apellidos}</td>
            <td className="p-3">
              {formatDate(exp.fechaNacimiento)}
            </td>

            <td className="p-3 flex gap-2">
              <button
                className="px-3 py-1 text-blue-950 hover:text-blue-700 transition-all duration-300 cursor-pointer"
                onClick={() => onEdit(exp, exp.id)}
              >
                <Pen size={18}></Pen>
              </button>

              <button
                disabled={deleteLoading}
                className="px-3 py-1 text-red-900 hover:text-red-700 transition-all duration-300 cursor-pointer text-center"
                onClick={() => onDelete(exp.id)}
              >
                <Trash2 size={18}></Trash2>
              </button>

              <button
                className="px-3 py-1 text-cyan-950 hover:text-cyan-700 transition-all duration-300 cursor-pointer"
                onClick={() => onDetail(exp.id)}
              >
                <Eye size={18}></Eye>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
