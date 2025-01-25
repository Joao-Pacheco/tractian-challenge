import Image from "next/image";
import { data, TreeNodeType } from "./data";
import TreeView from "./TreeView/TreeView";

export default function AssestList() {
  return (
    <div className="rounded-sm border border-[#D8DFE6] basis-1/3 p-0 mr-2">
      <div className="relative w-full">
        <input
          type="text"
          className="w-full p-4 focus:ring-blue-500 focus:border-blue-500 border-b border-[#D8DFE6]"
          placeholder="Buscar Ativo ou Local"
        />
        <div className="absolute inset-y-0 right-5 flex items-center pl-3 pointer-events-none">
          <Image src="/search-icon.svg" alt="Buscar" width={15} height={15} />
        </div>
      </div>
      <div className="p-4 bg-white shadow-md rounded-md">
        {data.map((node, index) => (
          <TreeView key={index} node={node} />
        ))}
      </div>
    </div>
  );
}
