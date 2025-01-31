import { useMainComponentStore } from "@/store/mainComponent.store";
import Image from "next/image";

export const getCorrentIcon = (type: string, item: Location | Component) => {
  const { mainComponent } = useMainComponentStore();

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
          src={
            item.id === mainComponent.id
              ? "/component-icon-selected.svg"
              : "/component-icon.svg"
          }
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
