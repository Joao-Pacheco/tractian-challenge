import { Filter } from "@/utils/types/filter";
import { create } from "zustand";

interface FiltersStore {
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
  selectFilter: (filter: Filter) => void;
  removeSelectedFilter: () => void;
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  filters: [
    {
      name: "Sensor de Energia",
      selected: false,
      id: 1,
      srcImageIcon: "/energia-icon.svg",
      type: "energy",
    },
    {
      name: "Crítico",
      selected: false,
      id: 2,
      srcImageIcon: "/critical-icon.svg",
      type: "critical",
    },
  ],

  setFilters: (filters) =>
    set(() => ({
      filters,
    })),

  selectFilter: (filter) =>
    set((state) => ({
      filters: state.filters.map((item) => ({
        ...item,
        selected: item.id === filter.id,
      })),
    })),
  removeSelectedFilter: () =>
    set((state) => ({
      filters: state.filters.map((item) => ({
        ...item,
        selected: false,
      })),
    })),
}));
