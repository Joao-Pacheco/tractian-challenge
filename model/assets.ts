interface AssetNotCatalogued {
  id: string;
  name: string;
  parentId: string | null;
  sensorId: string | null;
  sensorType: string | null;
  status: string | null;
  gatewayId: string | null;
  locationId: string | null;
}

interface Asset {
  id: string;
  name: string;
  locationId: string | null;
}

interface subAsset {
  id: string;
  name: string;
  parentId: string | null;
}

interface Componet {
  id: string;
  name: string;
  parentId: string | null;
  sensorId: string | null;
  sensorType: string | null;
  status: string | null;
  gatewayId: string | null;
}
