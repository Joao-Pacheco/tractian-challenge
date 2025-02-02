import { useState } from "react";
import Image from "next/image";
import { useCompaniesStore } from "@/store/companies.store";
import { useListStore } from "@/store/list.store";
import { useMainComponentStore } from "@/store/mainComponent.store";
import { useFiltersStore } from "@/store/filters.store";

export default function Search() {
  const [inputSearch, setInputSearch] = useState("");
  const { companies } = useCompaniesStore();
  const { setList } = useListStore();
  const { setMainComponent } = useMainComponentStore();
  const { removeSelectedFilter } = useFiltersStore();

  const search = async () => {
    setList([]);
    setMainComponent({});
    removeSelectedFilter();

    const selectedCompanyId = companies.find((c) => c.selected)?.id;
    await fetch(`api/search/${selectedCompanyId}/${inputSearch}`)
      .then((response) => response.json())
      .then((locations) => {
        return setList(locations.data);
      });
  };

  const handleInputChange = (event: { target: { value: any } }) => {
    setInputSearch(event.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        role="search"
        type="text"
        value={inputSearch}
        onKeyDown={(e) => e.key === "Enter" && search()}
        onChange={handleInputChange}
        className="w-full p-4 focus:ring-blue-500 focus:border-blue-500 border-b border-[#D8DFE6] text-[#24292F]"
        placeholder="Buscar Ativo ou Local"
      />
      <div
        onClick={search}
        className="absolute inset-y-0 right-5 flex items-center pl-3 cursor-pointer"
      >
        <Image
          src="/search-icon.svg"
          alt="Buscar"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
