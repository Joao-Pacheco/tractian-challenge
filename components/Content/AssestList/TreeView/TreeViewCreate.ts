import { toast } from "react-toastify";

const fetchData = async (url: string, errorMessage: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    const { data } = await response.json();
    return data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

const fetchLocations = async (companies: Company[]) => {
  const selectedCompanyId = companies.find((c) => c.selected)?.id;
  if (!selectedCompanyId) {
    throw new Error("No selected company found");
  }

  return fetchData(
    `/api/locations/${selectedCompanyId}`,
    "Error fetching locations"
  );
};

const fetchAssets = async (companies: Company[]) => {
  const selectedCompanyId = companies.find((c) => c.selected)?.id;
  if (!selectedCompanyId) {
    throw new Error("No selected company found");
  }

  return fetchData(`/api/assets/${selectedCompanyId}`, "Error fetching assets");
};

export const treeViewCreate = async (
  companies: Company[]
): Promise<Location[]> => {
  try {
    const [locations, assets] = await Promise.all([
      fetchLocations(companies),
      fetchAssets(companies),
    ]);

    const locationMap = new Map<string | number, Location | Sublocation>();
    locations.forEach((location: Location) => {
      locationMap.set(location.id, location);
      location.children?.forEach((subLocation: Sublocation) => {
        locationMap.set(subLocation.id, subLocation);
      });
    });

    const newTree: Array<Location | Component> = [];

    for (const asset of assets) {
      const parent = asset.locationId
        ? locationMap.get(asset.locationId)
        : null;

      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(asset);
      } else {
        newTree.push(asset);
      }
    }

    return [...locations, ...newTree];
  } catch (error) {
    toast.error("Failed to create tree view");
    throw error;
  }
};
