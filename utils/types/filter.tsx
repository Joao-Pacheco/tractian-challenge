export interface Filter {
  id: number;
  name: string;
  selected: boolean;
  srcImageIcon: string;
  type: "energy" | "critical";
}
