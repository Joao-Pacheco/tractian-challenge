import React, { useState } from "react";
import Image from "next/image";
import "./TreeView.css";
import { stat } from "fs";
import { useMainComponentStore } from "@/store/mainComponent.store";
import { getStatusColor } from "@/utils/gets/getStausColor";
import { getCorrentIcon } from "@/utils/gets/getCorrentIcon";
import { getSensorType } from "@/utils/gets/getSensorType";

interface TreeViewProps {
  key: number | string;
  item: Location | Component;
}

export default function TreeView({ item }: TreeViewProps) {
  const children = item.children || [];
  const [expanded, setExpanded] = useState(children.length >= 9 ? false : true);
  const { mainComponent, setMainComponent } = useMainComponentStore();

  const handleClickToSelect = (item: Component | Location) => {
    if (item.type !== "component") {
      setExpanded(!expanded);
    } else {
      setMainComponent(item);
    }
  };

  return (
    <div className="pl-3 relative m-2 text-sm">
      {item.children !== null && item.children.length !== 0 && (
        <Image
          onClick={() => setExpanded(!expanded)}
          src="/arro-donw-icon.svg"
          alt={"Location"}
          width="0"
          height="0"
          sizes="100vw"
          className={`w-full max-w-[10px] h-auto absolute top-2 left-[-4px] ${
            !expanded ? "-rotate-90" : ""
          }`}
        />
      )}
      <div
        className={`
          ${item.id === mainComponent.id ? "bg-[#2188ff]" : ""}

          item-tree p-1 flex gap-2 ${
            item.type === "location" ? "item-list" : ""
          } ${
          item.children !== null && item.children.length !== 0
            ? ""
            : "not-parent"
        }`}
        onClick={() => handleClickToSelect(item)}
      >
        <span className="text-blue-500">{getCorrentIcon(item.type, item)}</span>

        <span
          className={` ${
            item.id === mainComponent.id ? "text-white" : ""
          } item-tree-text text-gray-700 font-medium`}
        >
          {item.name}
        </span>

        {item.status && (
          <span
            className={`${getStatusColor(
              item.status
            )} text-xs flex items-center justify-center`}
          >
            {getSensorType(item.sensorType, item.status)}
          </span>
        )}
      </div>

      {expanded &&
        item.children &&
        item.children.map((children: Location | Component) => (
          <TreeView key={item.id + children.id} item={children} />
        ))}
    </div>
  );
}
