import React from "react";
import Image from "next/image";
import "./TreeView.css";
import { stat } from "fs";

interface TreeViewProps {
  key: number | string;
  item: Location | Component;
}

export default function TreeView({ item }: TreeViewProps) {
  const getStatusColor = (status?: "operating" | "alert") => {
    if (status === "operating") return "text-green-500";
    if (status === "alert") return "text-red-500";
    return "text-gray-400";
  };

  const getCorrentIcon = (type: string) => {
    switch (type) {
      case "location":
        return (
          <Image
            src="/location-icon.svg"
            alt={"Location"}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        );
      case "sublocation":
        return (
          <Image
            src="/location-icon.svg"
            alt={"Location"}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        );
      case "component":
        return (
          <Image
            src="/component-icon.svg"
            alt={"component"}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        );
      case "asset":
        return (
          <Image
            src="/asset-icon.svg"
            alt={"asset"}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        );
      case "subasset":
        return (
          <Image
            src="/asset-icon.svg"
            alt={"asset"}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        );
    }
  };

  const getSensorType = (sensor: string, status?: "operating" | "alert") => {
    switch (sensor) {
      case "vibration":
        return <>●</>;
      case "energy":
        return (
          <>
            <Image
              src={status === "alert" ? "/bolt-icon-red.svg" : "/bolt-icon.svg"}
              alt={"Sensor de Energia"}
              width="0"
              height="0"
              sizes="100vw"
              className={`w-full h-auto mr-2 ${
                status === "alert" ? "max-w-[18px]" : "max-w-[9px]"
              }`}
            />
          </>
        );
    }
  };

  return (
    <div className="pl-3 relative m-2 text-sm">
      {item.children !== null && item.children.length !== 0 && (
        <Image
          src="/arro-donw-icon.svg"
          alt={"Location"}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full max-w-[10px] h-auto absolute top-2 left-[-4px]"
        />
      )}
      <div
        className={`flex gap-2 ${item.type === "location" ? "item-list" : ""} ${
          item.children !== null && item.children.length !== 0
            ? ""
            : "not-parent"
        }`}
      >
        <span className="text-blue-500">{getCorrentIcon(item.type)}</span>

        <span className="text-gray-700 font-medium">{item.name}</span>

        {item.status && (
          <span className={`${getStatusColor(item.status)} text-xs`}>
            {getSensorType(item.sensorType, item.status)}
          </span>
        )}
      </div>

      {item.children &&
        item.children.map((children: Location | Component) => (
          <TreeView key={item.id + children.id} item={children} />
        ))}
    </div>
  );
}
