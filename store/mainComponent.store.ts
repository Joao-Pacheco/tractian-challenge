import { create } from "zustand";
import { emptyComponent } from "../utils/empytItems/empytComponent";

interface MainComponentStore {
  mainComponent: Component;
  setMainComponent: (mainComponent: any) => void;
  resetMainComponent: () => void;
}

export const useMainComponentStore = create<MainComponentStore>((set) => ({
  mainComponent: emptyComponent,
  setMainComponent: (mainComponent) => set({ mainComponent }),
  resetMainComponent: () =>
    set({
      mainComponent: emptyComponent,
    }),
}));
