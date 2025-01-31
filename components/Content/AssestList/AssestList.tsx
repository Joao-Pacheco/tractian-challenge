"use client";
import Image from "next/image";
import TreeView from "./TreeView/TreeView";
import { useEffect, useState } from "react";
import { useCompaniesStore } from "@/store/companies.store";
import { useListStore } from "@/store/list.store";
import { useMemo } from "react";
import Search from "./Search/Search";
import { useMainComponentStore } from "@/store/mainComponent.store";
import { createTreeView } from "@/utils/createTreeView/createTreeView";

export default function AssestList() {
  const { companies } = useCompaniesStore();
  const { list, setList } = useListStore();
  const { setMainComponent } = useMainComponentStore();

  const renderedList = useMemo(() => {
    return list.map((item) => {
      return <TreeView key={item.id} item={item} />;
    });
  }, [list]);

  useEffect(() => {
    if (companies.length === 0) return;
    setList([]);
    setMainComponent({});
    createTreeView(companies, setList);
  }, [companies]);

  return (
    <div className="rounded-sm border border-[#D8DFE6] basis-1/3 p-0 mr-2 bg-white shadow-md rounded-md">
      <Search />

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
              className="w-12 h-auto mx-auto animate-spin"
            />
          </div>
        )}
      </div>
    </div>
  );
}
