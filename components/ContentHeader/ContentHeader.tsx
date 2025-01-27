import Image from "next/image";
import "./ContentHeader.css";

export default function ContentHeader() {
  return (
    <div className="w-full flex items-center justify-between pb-3 text-[#77818C]">
      <div>
        <span className="text-xl font-semibold text-[#24292F]">Ativos </span>/
        Apex Unit
      </div>
      <div className="flex space-x-2">
        <button className="content-header-button">
          <Image
            src="/energia-icon.svg"
            alt="Sensor de Energia"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto mr-2 max-w-[14px]"
          />
          Sensor de Energia
        </button>
        <button className="content-header-button">
          <Image
            src="/critico-icon.svg"
            alt="Crítico"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto mr-2 max-w-[14px]"
          />
          Crítico
        </button>
      </div>
    </div>
  );
}
