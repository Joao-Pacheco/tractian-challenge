"use client";
import Image from "next/image";
import { data } from "./data";
import TreeView from "./TreeView/TreeView";
import { useEffect } from "react";
import { useCompaniesStore } from "@/store/companies.store";
import { treeViewCreate } from "./TreeView/TreeViewCreate";

export default function AssestList() {
  const { companies } = useCompaniesStore();
  useEffect(() => {
    if (companies.length === 0) return;
    treeViewCreate(companies);
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
      <div className="p-4">
        {data.map((node, index) => (
          <TreeView key={index} node={node} />
        ))}
      </div>
    </div>
  );
}
