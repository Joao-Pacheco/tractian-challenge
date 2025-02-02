import Image from "next/image";

export const getSensorType = (sensor: string | null, status: string | null) => {
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
            className={`w-full h-auto mr-2 max-w-[18px] ${
              status === "alert" ? "max-w-[18px]" : "max-w-[9px]"
            }`}
          />
        </>
      );
  }
};
