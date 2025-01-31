import { NextResponse } from "next/server";

async function fetchAssets(companyId: string): Promise<AssetNotCatalogued[]> {
  const API_URL = `https://fake-api.tractian.com/companies/${companyId}/assets`;
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch assets. Status: ${response.status}`);
  }
  return response.json();
}

function componentAdapter(item: AssetNotCatalogued): Component {
  return {
    id: item.id,
    name: item.name,
    parentId: item.parentId,
    sensorId: item.sensorId,
    sensorType: item.sensorType,
    status: item.status,
    gatewayId: item.gatewayId,
    locationId: item.locationId,
    children: null,
    type: "component",
    selected: false,
  };
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const { id } = await params;

  try {
    const response = await fetchAssets(id);

    const componentWithoutParentOrLocation: Component[] = [];
    const assetsMap = new Map<string, Asset>();
    const subAssetsMap = new Map<string, SubAsset>();
    const components: Component[] = [];
    const componentsWithLocation: Component[] = [];

    for (const item of response) {
      if (item.sensorType !== null) {
        if (item.parentId || item.locationId) {
          components.push(componentAdapter(item));
        } else {
          componentWithoutParentOrLocation.push(componentAdapter(item));
        }
      } else {
        const key = item.parentId ? "sub" : "asset";
        const adaptedItem =
          key === "sub"
            ? {
                id: item.id,
                name: item.name,
                parentId: item.parentId,
                locationId: null,
                children: [],
                type: "subasset",
              }
            : {
                id: item.id,
                name: item.name,
                parentId: null,
                locationId: item.locationId,
                children: [],
                type: "asset",
              };
        if (key === "sub") {
          subAssetsMap.set(item.id, adaptedItem);
        } else {
          assetsMap.set(item.id, adaptedItem);
        }
      }
    }

    for (const component of components) {
      const parent = component.parentId
        ? subAssetsMap.get(component.parentId) ||
          assetsMap.get(component.parentId)
        : null;

      if (parent) {
        parent.children.push(component);
      } else if (component.locationId) {
        componentsWithLocation.push(component);
      }
    }

    for (const subAsset of subAssetsMap.values()) {
      const parent = assetsMap.get(subAsset.parentId ?? "");
      if (parent) {
        parent.children.push(subAsset);
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: [
          ...Array.from(assetsMap.values()),
          ...componentWithoutParentOrLocation,
          ...componentsWithLocation,
        ],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching assets:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch assets",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
