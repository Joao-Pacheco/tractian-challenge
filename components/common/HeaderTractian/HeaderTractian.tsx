import Image from "next/image";
import "./HeaderTractian.css";

export default function HeaderTractian() {
  return (
    <header className="header-tractian flex items-center justify-between p-3">
      <div className="logo">
        <a href="/">
          <Image src="/logo.svg" alt="Tractian Logo" width={120} height={30} />
        </a>
      </div>
      <ul className="flex space-x-2">
        <li className="header-button-selected header-button">
          <button className="flex items-center">
            <Image
              src="/unit-icon.svg"
              alt="Apex Unit"
              width={12}
              height={12}
              className="mr-2"
            />
            Apex Unit
          </button>
        </li>
        <li className="header-button">
          <button className="flex items-center">
            <Image
              src="/unit-icon.svg"
              alt="Tobias Unit"
              width={12}
              height={12}
              className="mr-2"
            />
            Tobias Unit
          </button>
        </li>
        <li className="header-button">
          <button className="flex items-center">
            <Image
              src="/unit-icon.svg"
              alt="Jaguar Unit"
              width={12}
              height={12}
              className="mr-2"
            />{" "}
            Jaguar Unit
          </button>
        </li>
      </ul>
    </header>
  );
}
