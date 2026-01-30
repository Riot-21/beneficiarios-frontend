import { useState } from "react";
import { BeneficiariosList } from "./components/BeneficiariosList";
import { FullScreenLoading } from "./components/custom/FullScreenLoading";
import {
  useBeneficiarioById,
  useBeneficiarios,
  useCreateBenef,
  useDeleteBenef,
  useUpdateBenef,
} from "./hooks/useBeneficiarios";
import {
  beneficiarioSchema,
  type BeneficiarioForm,
} from "./interfaces/beneficiario.schema";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { EditModal } from "./components/EditModal";
import { DetailModal } from "./components/DetailModal";
import { useDocumentos } from "./hooks/useDocumentos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { DocumentoResponse } from "./interfaces/documento-response.interface";
import { Pagination } from "./components/custom/Pagination";
import { CreateForm } from "./components/CreateForm";

function App() {
  //estados para los documentos
  const [documentSelectedCreate, setDocumentSelectedCreate] =
    useState<DocumentoResponse | null>(null);
  const [documentSelectedEdit, setDocumentSelectedEdit] =
    useState<DocumentoResponse | null>(null);
  //states para manejar los modales y datos a editar
  const [showConfirm, setShowConfirm] = useState(false);
  const [benefEdit, setBenefEdit] = useState<BeneficiarioForm | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //hooks
  const { data, isLoading } = useBeneficiarios();
  const { data: documentos, isLoading: docLoading } = useDocumentos();
  const { mutation: create } = useCreateBenef();
  const { mutation: update } = useUpdateBenef();
  const { mutation: deleteBenef } = useDeleteBenef();
  const deleteLoading = deleteBenef.isPending;
  const { data: benefDetail, isLoading: detailLoading } =
    useBeneficiarioById(currentId);

  //data paginada
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleBeneficiarios = data?.slice(start, end) ?? [];

  //form para create
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BeneficiarioForm>({
    resolver: zodResolver(beneficiarioSchema),
  });

  //handler para POST
  const onCreateSubmit = async (data: BeneficiarioForm) => {
    await create.mutateAsync(data, {
      onSuccess: () => {
        (toast.success("Beneficiario registrado correctamente"), reset());
      },
      onError: () => {
        toast.error("Error al registrar beneficiario");
      },
    });
  };

  // handler para PUT
  const onEditSubmit = async (data: BeneficiarioForm) => {
    if (!currentId) {
      toast.error("No se encontro el id");
      return;
    }

    await update.mutateAsync(
      { id: currentId, datos: data },
      {
        onSuccess: () => {
          toast.success("Beneficiario editado correctamente");
          setDocumentSelectedEdit(null);
          setIsModalOpen(false);
        },
        onError: () => {
          toast.error("Error al editar beneficiario");
        },
      },
    );
  };

  //handler para DELETE
  const handleDelete = async (id: number) => {
    await deleteBenef.mutateAsync(id, {
      onSuccess: () => {
        toast.success("Beneficiario eliminado correctamente");
        setShowConfirm(false);
        setCurrentId(null);
        reset();
      },
      onError: () => {
        toast.error("Error al eliminar beneficiario");
      },
    });
  };

  //handler para mensaje de confirmacion
  const onDeleteInit = (id: number) => {
    setCurrentId(id);
    setShowConfirm(true);
  };
  //handler para modal de edicion
  const openEditModal = (benef: BeneficiarioForm, id: number) => {
    setCurrentId(id);
    setBenefEdit(benef);

    const doc =
      documentos?.find((d) => d.id === benef.documentoIdentidadId) || null;
    setDocumentSelectedEdit(doc);

    setIsModalOpen(true);
  };

  const openDetailModal = (id: number) => {
    setIsDetailModalOpen(true);
    setCurrentId(id);
  };
  const handleCloseModal = () => {
    setDocumentSelectedEdit(null);
    setIsModalOpen(false);
    setCurrentId(null);
  };

  if (isLoading) return <FullScreenLoading></FullScreenLoading>;

  return (
    <main className="p-6 min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 rounded-xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel de Beneficiarios</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* formulario */}
        <section className="bg-white rounded-xl shadow p-6 w-full lg:col-span-1 self-start h-auto transform transition-all duration-300  animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4 text-cyan-950">
            Registrar beneficiario
          </h2>

          <CreateForm
            onSubmit={onCreateSubmit}
            reset={reset}
            isSubmitting={isSubmitting}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            documentos={documentos ?? []}
            docLoading={docLoading}
            documentSelected={documentSelectedCreate}
            setDocumentSelected={setDocumentSelectedCreate}
            submitLabel="Crear beneficiario"
          />
        </section>

        <section className="space-y-2 bg-white rounded-xl shadow p-6 w-full lg:col-span-2 overflow-x-auto transform transition-all duration-300  animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4 text-cyan-950">
            Lista de Beneficiarios
          </h2>
          {data && data.length > 0 ? (
            <>
              <BeneficiariosList
                beneficiarios={visibleBeneficiarios}
                onEdit={openEditModal}
                onDelete={onDeleteInit}
                onDetail={openDetailModal}
                deleteLoading={deleteLoading}
              ></BeneficiariosList>

              <Pagination
                totalItems={data.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onChangePage={setCurrentPage}
                onChangeItemsPerPage={(n) => {
                  setItemsPerPage(n);
                  setCurrentPage(1);
                }}
              ></Pagination>
            </>
          ) : (
            <h1>No hay datos para mostrar</h1>
          )}
        </section>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={() => currentId && handleDelete(currentId)}
        onCancel={() => setShowConfirm(false)}
        message="¿Seguro de eliminar este beneficiario?"
        isLoading={deleteLoading}
      ></ConfirmDialog>

      <EditModal
        benefId={currentId}
        benef={benefEdit}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={onEditSubmit}
        documentos={documentos ?? []}
        docLoading={docLoading}
        documentSelected={documentSelectedEdit}
        setDocumentSelected={setDocumentSelectedEdit}
      ></EditModal>

      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        benef={benefDetail ?? null}
        loading={detailLoading}
      />
    </main>
  );
}

export default App;
