"use client";
import Image from "next/image";
import "./HeaderTractian.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCompaniesStore } from "../../../store/companies.store";

export default function HeaderTractian() {
  const { companies, setCompanies } = useCompaniesStore();
  const { selectCompany } = useCompaniesStore();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/api/companies");
        if (!response.ok) {
          throw new Error("Error fetching companies");
        }
        const data = await response.json();
        setCompanies(data.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchCompanies();
  }, []);
  return (
    <header className="header-tractian flex items-center justify-between p-3">
      <div className="logo">
        <a href="/">
          <Image
            src="/logo.svg"
            alt="Tractian Logo"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </a>
      </div>
      <ul className="flex space-x-2">
        {companies.map((company) => (
          <li
            key={company.id}
            className={`header-button ${
              company.selected ? "header-button-selected" : ""
            }`}
          >
            <button
              className="flex items-center"
              onClick={(event) => {
                event.preventDefault();
                selectCompany(company);
              }}
            >
              <Image
                src="/unit-icon.svg"
                alt={company.name}
                width="0"
                height="0"
                sizes="100vw"
                className="w-full max-w-[14px] h-auto mr-2"
              />
              {company.name + " Unit"}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
