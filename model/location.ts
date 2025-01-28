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
  children: Array<Sublocation>;
  [key: string]: any;
}

interface Sublocation {
  id: string;
  name: string;
  parentId: string;
  [key: string]: any;
}
