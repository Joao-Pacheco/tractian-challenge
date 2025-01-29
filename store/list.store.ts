import { create } from "zustand";

interface ListStore {
  list: Location[] | Component[];
  setList: (list: Location[] | Component[]) => void;
}

export const useListStore = create<ListStore>((set) => ({
  list: [],
  setList: (newList) =>
    set((state) => {
      if (state.list === newList) return state;
      return { list: newList };
    }),
}));
