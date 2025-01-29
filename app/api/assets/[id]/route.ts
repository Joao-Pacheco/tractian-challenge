import { NextResponse } from "next/server";

async function fetchAssets(companyId: string): Promise<AssetNotCatalogued[]> {
  const API_URL = `https://fake-api.tractian.com/companies/${companyId}/assets`;
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch assets. Status: ${response.status}`);
  }
  return response.json();
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const { id } = params;

  try {
    const response = await fetchAssets(id);

    const componentWithoutParentOrLocation: Componet[] = [];
    const assetsMap = new Map<string, Asset>();
    const subAssetsMap = new Map<string, SubAsset>();
    const components: Componet[] = [];

    for (const item of response) {
      if (item.sensorType !== null) {
        if (item.parentId || item.locationId) {
          components.push(item);
        } else {
          componentWithoutParentOrLocation.push(item);
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
              }
            : {
                id: item.id,
                name: item.name,
                parentId: null,
                locationId: item.locationId,
                children: [],
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
        : assetsMap.get(component.locationId ?? "");

      if (parent) {
        parent.children.push(component);
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
        data: {
          assets: Array.from(assetsMap.values()),
          componentWithoutParentOrLocation,
          response,
        },
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
