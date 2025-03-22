import { useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useCompaniesStore } from "@/store/companies.store";
import { useListStore } from "@/store/list.store";
import { useMainComponentStore } from "@/store/mainComponent.store";
import { useFiltersStore } from "@/store/filters.store";
import { toast } from "react-toastify";

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { companies } = useCompaniesStore();
  const { setList } = useListStore();
  const { setMainComponent } = useMainComponentStore();
  const { removeSelectedFilter } = useFiltersStore();
  const [isLoading, setIsLoading] = useState(false);

  const selectedCompanyId = useMemo(() => {
    return companies.find((company) => company.selected)?.id;
  }, [companies]);

  const search = useCallback(async () => {
    const inputValue = inputRef.current?.value.trim() || "";
    if (!inputValue) {
      toast.warn("Por favor, insira um termo para buscar.");
      return;
    }

    setIsLoading(true);
    setList([]);
    setMainComponent({});
    removeSelectedFilter();

    try {
      const response = await fetch(
        `/api/search/${selectedCompanyId}/${inputValue}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar dados.");
      }
      const locations = await response.json();
      if (Array.isArray(locations.data)) {
        setList(locations.data);
      } else {
        throw new Error("Formato de dados inválido.");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCompanyId, setList, setMainComponent, removeSelectedFilter]);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        role="search"
        type="text"
        onKeyDown={(e) => e.key === "Enter" && search()}
        className="w-full p-4 focus:ring-blue-500 focus:border-blue-500 border-b border-[#D8DFE6] text-[#24292F]"
        placeholder="Buscar Ativo ou Local"
        aria-label="Buscar Ativo ou Local"
      />
      <button
        onClick={search}
        className="absolute inset-y-0 right-5 flex items-center pl-3 cursor-pointer"
        aria-label="Buscar"
        disabled={isLoading}
      >
        <Image
          src="/search-icon.svg"
          alt="Buscar"
          width={20}
          height={20}
          className="w-auto h-auto"
        />
      </button>
      {isLoading && <p className="text-sm text-gray-500 mt-2">Buscando...</p>}
    </div>
  );
}
