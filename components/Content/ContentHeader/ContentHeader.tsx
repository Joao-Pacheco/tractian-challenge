"use client";
import Image from "next/image";
import "./ContentHeader.css";
import { useCompaniesStore } from "@/store/companies.store";
import { useListStore } from "@/store/list.store";
import { useMainComponentStore } from "@/store/mainComponent.store";
import { useFiltersStore } from "@/store/filters.store";
import { Filter } from "@/utils/types/filter";
import { createTreeView } from "@/utils/createTreeView/createTreeView";

export default function ContentHeader() {
  const { companies } = useCompaniesStore();
  const { setList } = useListStore();
  const { setMainComponent } = useMainComponentStore();
  const { filters, selectFilter, removeSelectedFilter } = useFiltersStore();

  const searchByFilter = async (
    filterType: "energy" | "critical",
    filter: Filter
  ) => {
    if (filters.find((filter) => filter.selected) !== filter) {
      setList([]);
      setMainComponent({});
      selectFilter(filter);
      const selectedCompanyId = companies.find((c) => c.selected)?.id;
      await fetch(`api/filter/${selectedCompanyId}/${filterType}`)
        .then((response) => response.json())
        .then((locations) => {
          return setList(locations.data);
        });
    } else {
      removeSelectedFilter();
      createTreeView(companies, setList);
    }
  };

  return (
    <div className="w-full flex items-center justify-between pb-3 text-[#77818C]">
      <div>
        <span className="text-xl font-semibold text-[#24292F]">Ativos </span>/
        Apex Unit
      </div>
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`${
              filter.selected ? "filter-button-selected" : ""
            } content-header-button`}
            onClick={() => searchByFilter(filter.type, filter)}
          >
            <Image
              src={filter.srcImageIcon}
              alt={filter.name}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto mr-2 max-w-[14px]"
            />
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
}
