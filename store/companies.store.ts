import { create } from "zustand";

interface CompaniesStore {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  selectCompany: (company: Company) => void;
}

export const useCompaniesStore = create<CompaniesStore>((set) => ({
  companies: [],

  setCompanies: (companies) =>
    set(() => ({
      companies,
    })),

  selectCompany: (company) =>
    set((state) => ({
      companies: state.companies.map((item) => ({
        ...item,
        selected: item.id === company.id,
      })),
    })),
}));
