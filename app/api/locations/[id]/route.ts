import { NextResponse } from "next/server";

type Location = {
  id: string;
  name: string;
  parentId: string | null;
};

type LocationParent = {
  id: string;
  name: string;
  parentId: string | null;
  children: (LocationParent | Sublocation)[];
  type: "location";
};

type Sublocation = {
  id: string;
  name: string;
  parentId: string;
  children: Sublocation[];
  type: "sublocation";
};

async function fetchLocations(companyId: string): Promise<Location[]> {
  const response = await fetch(
    `https://fake-api.tractian.com/companies/${companyId}/locations`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch locations. Status: ${response.status}`);
  }

  return response.json();
}

function locationParentAdapter(item: Location): LocationParent {
  return {
    id: item.id,
    name: item.name,
    parentId: item.parentId,
    children: [],
    type: "location",
  };
}

function subLocationAdapter(item: Location): Sublocation {
  return {
    id: item.id,
    name: item.name,
    parentId: item.parentId ?? "",
    children: [],
    type: "sublocation",
  };
}

function associateSublocations(
  items: (LocationParent | Sublocation)[],
  sublocations: Sublocation[]
) {
  const sublocationMap = new Map<string, Sublocation[]>();

  sublocations.forEach((sub) => {
    if (!sublocationMap.has(sub.parentId)) {
      sublocationMap.set(sub.parentId, []);
    }
    sublocationMap.get(sub.parentId)?.push(sub);
  });

  const processItems = (items: (LocationParent | Sublocation)[]) => {
    items.forEach((item) => {
      const children = sublocationMap.get(item.id) || [];
      item.children.push(...children);

      if (children.length > 0) {
        processItems(children);
      }
    });
  };

  processItems(items);
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    const locations = await fetchLocations(id);

    const locationsParents: LocationParent[] = [];
    const sublocations: Sublocation[] = [];

    locations.forEach((item) => {
      if (item.parentId === null) {
        locationsParents.push(locationParentAdapter(item));
      } else {
        sublocations.push(subLocationAdapter(item));
      }
    });

    associateSublocations(locationsParents, sublocations);

    return NextResponse.json(
      { success: true, data: locationsParents },
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
