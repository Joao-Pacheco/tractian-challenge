import { create } from "zustand";

interface LocationsStore {
  locations: Location[];
  setLocations: (locations: Location[]) => void;
}

export const useLocationsStore = create<LocationsStore>((set) => ({
  locations: [],
  setLocations: (locations) => set({ locations }),
}));
