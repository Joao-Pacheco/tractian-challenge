"use client";
import Image from "next/image";
import TreeView from "./TreeView/TreeView";
import { useEffect } from "react";
import { useCompaniesStore } from "@/store/companies.store";
import { useListStore } from "@/store/list.store";
import { useMemo } from "react";

export default function AssestList() {
  const { companies } = useCompaniesStore();
  const { list, setList } = useListStore();

  async function handleTreeViewCreate() {
    const selectedCompanyId = companies.find((c) => c.selected)?.id;
    await fetch(`api/tree/${selectedCompanyId}`)
      .then((response) => response.json())
      .then((locations) => {
        return setList(locations.data);
      });
  }

  const renderedList = useMemo(() => {
    return list.map((item) => <TreeView key={item.id} item={item} />);
  }, [list]);

  useEffect(() => {
    if (companies.length === 0) return;
    setList([]);
    handleTreeViewCreate();
  }, [companies]);

  return (
    <div className="rounded-sm border border-[#D8DFE6] basis-1/3 p-0 mr-2 bg-white shadow-md rounded-md">
      <div className="relative w-full">
        <input
          type="text"
          className="w-full p-4 focus:ring-blue-500 focus:border-blue-500 border-b border-[#D8DFE6]"
          placeholder="Buscar Ativo ou Local"
        />
        <div className="absolute inset-y-0 right-5 flex items-center pl-3 pointer-events-none">
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

      <div className="p-4 h-[92%] overflow-scroll pb-8">
        {list.length !== 0 ? (
          renderedList
        ) : (
          <div className="h-full flex items-center">
            <Image
              src="/loading.svg"
              alt="Loading"
              width="0"
              height="0"
              sizes="100vw"
              className="w-12 h-auto mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
