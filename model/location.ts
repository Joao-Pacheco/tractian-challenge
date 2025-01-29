interface Location {
  id: string;
  name: string;
  parentId: string | null;
  [key: string]: any;
}

interface LocationParent {
  id: string;
  name: string;
  parentId: string | null;
  children: Array<Sublocation | Component | Asset | SubAsset>;
  [key: string]: any;
}

interface Sublocation {
  id: string;
  name: string;
  parentId: string;
  children: Array<Component | Asset | SubAsset>;
  [key: string]: any;
}
