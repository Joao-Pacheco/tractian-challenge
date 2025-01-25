import Image from "next/image";

export default function SelectedAsset() {
  const hasImage = true;

  return (
    <div className="rounded-sm border border-[#D8DFE6] basis-2/3 pb-4 shadow-md">
      <h1 className="text-[#24292F] font-semibold text-lg w-full border-b border-[#D8DFE6] px-4 pt-4 pb-3">
        MOTOR RT COAL AF01
        <span className=" text-green-500"> ●</span>
      </h1>
      <div className="p-4 flex w-full justify-between">
        {hasImage ? (
          <Image
            className="shadow-md rounded-md flex-2"
            src="/image-test.png"
            alt="Motor"
            width={336}
            height={226}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-[336px] h-[226px] border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg">
            <Image src="/upload-icon.svg" alt="Upload" width={31} height={31} />
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
            <div className="text-[#88929C]">Motor Elétrico (Trifásico)</div>
          </div>
          <div className="py-4">
            <h2 className="text-[#24292F] font-semibold py-3">Responsáveis</h2>
            <div className="text-[#88929C] flex items-center space-x-2">
              <span className="bg-[#2188FF] flex items-center justify-center w-7 h-7 rounded-full text-white font-light mr-2 ">
                E
              </span>
              Elétrica
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
              width={12}
              height={12}
              className="mr-2"
            />
            HIO4510
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-[#24292F] font-semibold py-3">Receptor</h2>
          <div className="text-[#88929C] flex items-center space-x-2">
            <Image
              src="/receptor.svg"
              alt="Sensor de Energia"
              width={12}
              height={12}
              className="mr-2"
            />
            EUH4R27
          </div>
        </div>
      </div>
    </div>
  );
}
