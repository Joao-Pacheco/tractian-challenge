import { NextResponse } from "next/server";

async function fetchAssets(companyId: string): Promise<AssetNotCatalogued[]> {
  const API_URL = `https://fake-api.tractian.com/companies/${companyId}/assets`;

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch assets. Status: ${response.status}`);
  }

  return response.json();
}

function assetsAdapter(item: AssetNotCatalogued) {
  return {
    id: item.id,
    name: item.name,
    locationId: item.locationId ?? null,
  };
}

function subAssetsAdapter(item: AssetNotCatalogued) {
  return {
    id: item.id,
    name: item.name,
    parentId: item.parentId ?? null,
  };
}

function componetsAdapter(item: AssetNotCatalogued) {
  return {
    id: item.id,
    name: item.name,
    parentId: item.parentId ?? null,
    sensorId: item.sensorId ?? null,
    sensorType: item.sensorType ?? null,
    status: item.status ?? null,
    gatewayId: item.gatewayId ?? null,
  };
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const { id } = params;
  try {
    let response = await fetchAssets(id);

    let assets = <Asset[]>[];
    let subAssets = <subAsset[]>[];
    let componets = <Componet[]>[];

    response.map((item) => {
      if (item.sensorType !== null)
        return componets.push(componetsAdapter(item));
      if (item.locationId !== null) return assets.push(assetsAdapter(item));
      if (item.parentId !== null) return subAssets.push(subAssetsAdapter(item));
    });
    //TODO: tirar o response da resposta aqui de baixo
    return NextResponse.json(
      { success: true, data: { assets, subAssets, componets, response } },
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
