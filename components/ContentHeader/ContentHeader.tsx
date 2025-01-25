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
            width={12}
            height={12}
            className="mr-2"
          />
          Sensor de Energia
        </button>
        <button className="content-header-button">
          <Image
            src="/critico-icon.svg"
            alt="Crítico"
            width={12}
            height={12}
            className="mr-2"
          />
          Crítico
        </button>
      </div>
    </div>
  );
}
