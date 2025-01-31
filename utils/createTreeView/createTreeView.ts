import { useCompaniesStore } from "@/store/companies.store";
import { useListStore } from "@/store/list.store";

export const createTreeView = async (
  companies: Company[],
  setList: Function
) => {
  const selectedCompanyId = companies.find((c) => c.selected)?.id;
  await fetch(`api/tree/${selectedCompanyId}`)
    .then((response) => response.json())
    .then((locations) => {
      return setList(locations.data);
    });
};
