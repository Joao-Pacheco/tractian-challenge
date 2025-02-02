"use client";
import { useMainComponentStore } from "@/store/mainComponent.store";
import Image from "next/image";
import { getStatusColor } from "@/utils/gets/getStausColor";
import { getSensorType } from "@/utils/gets/getSensorType";

export default function mainComponent() {
  const { mainComponent } = useMainComponentStore();

  return (
    <div className="rounded-sm border border-[#D8DFE6] basis-2/3 pb-4 shadow-md">
      <h1 className="text-[#24292F] font-semibold text-lg w-full border-b border-[#D8DFE6] px-4 pt-4 pb-3 flex">
        {mainComponent.name || "Selecione um componente"}
        <span
          className={`${getStatusColor(
            mainComponent.status
          )} text-xs ml-2 flex items-center justify-center`}
        >
          {getSensorType(mainComponent.sensorType, mainComponent.status)}
          <span className="max-w-[18px]"></span>
        </span>
      </h1>
      <span className="text-red-500 text-green-500"></span>

      {mainComponent.name && (
        <>
          <div className="p-4 flex w-full justify-between">
            {mainComponent.name.split(" ")[0] === "Motor" ? (
              <Image
                src="/image-test.png"
                alt="Motor"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto shadow-md rounded-md flex-2 max-w-[336px]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-[336px] h-[226px] border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg">
                <Image
                  src="/upload-icon.svg"
                  alt="Upload"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto max-w-[50px]"
                />
                <p className="mt-4 text-blue-400 text-sm font-medium">
                  Adicionar imagem do Ativo
                </p>
              </div>
            )}

            <div className="flex-1 pl-10">
              <div className="border-b border-[#E3EAEF] py-5">
                <h2 className="text-[#24292F] font-semibold py-3">
                  Tipo de Equipamento
                </h2>
                <div className="text-[#88929C]">
                  {mainComponent.name.split(" ")[0]}
                </div>
              </div>
              <div className="py-4">
                <h2 className="text-[#24292F] font-semibold py-3">
                  Responsáveis
                </h2>
                <div className="text-[#88929C] flex items-center space-x-2">
                  <span className="bg-[#2188FF] flex items-center justify-center w-7 h-7 rounded-full text-white font-light mr-2 ">
                    {mainComponent.sensorType === "energy" ? "E" : "O"}
                  </span>
                  {mainComponent.sensorType === "energy"
                    ? "Energia"
                    : "Operacional"}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#E3EAEF] p-4 w-[95%] mx-auto flex w-full">
            <div className="flex-1">
              <h2 className="text-[#24292F] font-semibold py-3">Sensor</h2>
              <div className="text-[#88929C] flex items-center space-x-2">
                <Image
                  src="/sendor-icon.svg"
                  alt="Sensor de Energia"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto mr-2 max-w-[20px]"
                />
                {mainComponent.sensorType}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-[#24292F] font-semibold py-3">Receptor</h2>
              <div className="text-[#88929C] flex items-center space-x-2">
                <Image
                  src="/receptor.svg"
                  alt="Sensor de Energia"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto mr-2 max-w-[20px]"
                />
                {mainComponent.gatewayId}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
