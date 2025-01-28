const fetchLocations = async (companies: Company[]) => {
  try {
    const id = companies.find((c) => c.selected)?.id;

    const response = await fetch(`/api/locations/${id}`);
    if (!response.ok) {
      throw new Error("Error fetching locations");
    }
    console.log(response.body);
    const data = await response.json();
    //setCompanies(data.data);
  } catch (error: any) {
    //toast.error(error.message);
  }
};

const fetchAssets = async (companies: Company[]) => {
  try {
    const id = companies.find((c) => c.selected)?.id;

    const response = await fetch(`/api/assets/${id}`);
    if (!response.ok) {
      throw new Error("Error fetching assets");
    }
    console.log(response.body);
    const data = await response.json();
    //setCompanies(data.data);
  } catch (error: any) {
    //toast.error(error.message);
  }
};

export const treeViewCreate = (companies: Company[]) => {
  fetchLocations(companies);
  fetchAssets(companies);
};
