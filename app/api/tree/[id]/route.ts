import { serverUrl } from "@/utils/gets/serverUrl";
import { NextResponse } from "next/server";

type Location = {
  id: string;
  name: string;
  parentId: string | null;
  children?: (Location | Sublocation | Asset)[];
  type: "location";
};

type Sublocation = {
  id: string;
  name: string;
  parentId: string;
  children?: (Sublocation | Asset)[];
  type: "sublocation";
};

type Asset = {
  id: string;
  name: string;
  parentId: string | null;
  locationId: string | null;
  children?: Asset[];
  type: "asset";
};

const fetchData = async (url: string, errorMessage: string) => {
  const apiUrl = `${serverUrl}/`;

  try {
    const response = await fetch(apiUrl + url);

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    const { data } = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch the data. Status: ${error.status}`);
  }
};

const fetchLocations = async (id: string) => {
  return fetchData(`/api/locations/${id}`, "Error fetching locations");
};

const fetchAssets = async (id: string) => {
  return fetchData(`/api/assets/${id}`, "Error fetching assets");
};

function associateAssets(
  items: (Location | Sublocation | Asset)[],
  assets: Asset[]
) {
  items.forEach((item) => {
    const children = assets.filter((asset) => asset.locationId === item.id);

    if (!item.children) {
      item.children = [];
    }
    item.children.push(...children);

    assets = assets.filter((asset) => asset.locationId !== item.id);

    if (item.children.length > 0) {
      associateAssets(item.children, assets);
    }
  });
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    const [locations, assets] = await Promise.all([
      fetchLocations(id),
      fetchAssets(id),
    ]);

    const locationMap = new Map<string | number, Location | Sublocation>();
    locations.forEach((location: Location) => {
      locationMap.set(location.id, location);
      location.children?.forEach(
        (subLocation: Location | Sublocation | Asset) => {
          locationMap.set(subLocation.id, subLocation as Location);
        }
      );
    });

    associateAssets(locations, assets);

    const orphanComponents: Asset[] = assets.filter(
      (asset: { locationId: any }) => !asset.locationId
    );

    return NextResponse.json(
      { success: true, data: [...locations, ...orphanComponents] },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching locations:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch locations",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
