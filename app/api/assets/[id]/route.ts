import { NextResponse, NextRequest } from "next/server";

async function fetchAssets(companyId: string): Promise<AssetNotCatalogued[]> {
  const response = await fetch(
    `https://fake-api.tractian.com/companies/${companyId}/assets`
  );

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
  const { id } = await context.params;

  try {
    const response = await fetchAssets(id);

    const componentWithoutParentOrLocation: Component[] = [];
    const assetsMap = new Map<string, Asset>();
    const subAssetsMap = new Map<string, SubAsset>();
    const components: Component[] = [];
    const componentsWithLocation: Component[] = [];

    for (const item of response) {
      if (item.sensorType !== null) {
        const component = componentAdapter(item);
        if (item.parentId || item.locationId) {
          components.push(component);
        } else {
          componentWithoutParentOrLocation.push(component);
        }
      } else {
        const key = item.parentId ? "sub" : "asset";
        const adaptedItem = {
          id: item.id,
          name: item.name,
          parentId: item.parentId,
          locationId: key === "asset" ? item.locationId : null,
          children: [],
          type: key === "sub" ? "subasset" : "asset",
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
          ...assetsMap.values(),
          ...componentWithoutParentOrLocation,
          ...componentsWithLocation,
        ],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching assets:", error.message);
    console.error("Error fetching assets:", error);
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
