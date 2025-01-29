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
  type: string;
  id: string;
  name: string;
  locationId: string | null;
  children: Array<SubAsset | Component>;
}

interface SubAsset {
  type: string;
  id: string;
  name: string;
  parentId: string | null;
  children: Array<SubAsset | Component>;
}

interface Component {
  type: string;
  id: string;
  name: string;
  parentId: string | null;
  sensorId: string | null;
  sensorType: string | null;
  status: string | null;
  gatewayId: string | null;
  locationId: string | null;
  children: null;
}

interface AssetOrSubAsset {
  type: string;
  id: string;
  name: string;
  parentId: string | null;
  locationId: string | null;
  children: (Asset | SubAsset | Component)[];
}
