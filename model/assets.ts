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
  children: Array<SubAsset | Componet>;
}

interface SubAsset {
  id: string;
  name: string;
  parentId: string | null;
  children: Array<SubAsset | Componet>;
}

interface Componet {
  id: string;
  name: string;
  parentId: string | null;
  sensorId: string | null;
  sensorType: string | null;
  status: string | null;
  gatewayId: string | null;
  locationId: string | null;
}

interface AssetOrSubAsset {
  id: string;
  name: string;
  parentId: string | null;
  locationId: string | null;
  children: (Asset | SubAsset | Componet)[];
}
