import React from "react";
import { TreeNodeType } from "../data";
import Image from "next/image";
import "./TreeView.css";

type TreeNodeProps = {
  node: TreeNodeType;
};

export default function TreeView({ node }: TreeNodeProps) {
  const getStatusColor = (status?: "online" | "offline") => {
    if (status === "online") return "text-green-500";
    if (status === "offline") return "text-red-500";
    return "text-gray-400";
  };

  return (
    <div className="pl-3 relative m-2 text-sm">
      <Image
        src="/arro-donw-icon.svg"
        alt={"Location"}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full max-w-[10px] h-auto absolute top-2 left-[-4px]"
      />
      <div
        className={`flex gap-2 ${node.type === "location" ? "item-list" : ""}`}
      >
        <span className="text-blue-500">
          {node.type === "location" ? (
            <Image
              src="/location-icon.svg"
              alt={"Location"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
          ) : (
            <Image
              src="/component-icon.svg"
              alt={"Location"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
          )}
        </span>

        <span className="text-gray-700 font-medium">{node.name}</span>

        {node.status && (
          <span className={`${getStatusColor(node.status)} text-xs`}>●</span>
        )}
      </div>

      {node.children &&
        node.children.map((child, index) => (
          <TreeView key={index} node={child} />
        ))}
    </div>
  );
}
