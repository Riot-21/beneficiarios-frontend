import {
  ChevronsRight,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onChangePage: (page: number | ((prev: number) => number)) => void;
  onChangeItemsPerPage: (items: number) => void;
};

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onChangePage,
  onChangeItemsPerPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPages = () : (number|"...")[] => {
    const pages: (number | "...")[] = [];
    const total = totalPages;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(total - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < total - 3) {
      pages.push("...");
    }
    pages.push(total);
    return pages;
  };

  return (
    <div className="flex justify-end items-center mt-2w-full">
      <div className="flex items-center gap-2 text-sm mr-2">
        <select
          value={itemsPerPage}
          onChange={(e) => onChangeItemsPerPage(Number(e.target.value))}
          className="border rounded-2xl px-2 py-1 text-md cursor-pointer"
        >
          <option value={5}>5 filas</option>
          <option value={10}>10 filas</option>
          <option value={15}>15 filas</option>
          <option value={20}>20 filas</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onChangePage(1)}
          disabled={currentPage === 1}
          className="py-2 disabled:opacity-40"
        >
          <ChevronsLeft size={18} />
        </button>

        <button
          onClick={() => onChangePage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="py-2 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {/* {pages.map(n => ( */}
        {getPages().map((n, index) => {
          if (n === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="px-1 text-gray-400 cursor-default select-none"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={n}
              onClick={() => onChangePage(n)}
              className={`px-2 text-md transition ${
                currentPage === n
                  ? "underline font-semibold text-blue-900"
                  : "hover:text-blue-700"
              }`}
            >
              {n}
            </button>
          );
        })}

        <button
          onClick={() => onChangePage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="py-2 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>

        <button
          onClick={() => onChangePage(totalPages)}
          disabled={currentPage === totalPages}
          className="py-2 disabled:opacity-40"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
};
