import { createLocalRequestContext } from "next/dist/server/after/builtin-request-context";
import { NextResponse } from "next/server";
import { Children } from "react";

async function fetchLocations(companyId: string): Promise<Location[]> {
  const API_URL = `https://fake-api.tractian.com/companies/${companyId}/locations`;

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch locations. Status: ${response.status}`);
  }

  return response.json();
}

function locationParentAdapter(item: Location) {
  return {
    id: item.id,
    name: item.name,
    parentId: item.parentId,
    children: [],
  };
}

function subLocationAdapter(item: Location) {
  return {
    id: item.id,
    name: item.name,
    parentId: item.parentId ?? "",
    children: [],
  };
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  const { id } = params;
  try {
    let locations = await fetchLocations(id);
    let locationsParents = <LocationParent[]>[];
    let sublocations = <Sublocation[]>[];

    locations.map((item) => {
      if (item.parentId === null)
        return locationsParents.push(locationParentAdapter(item));
      return sublocations.push(subLocationAdapter(item));
    });

    sublocations.map((item) => {
      locationsParents.map((parent) => {
        if (parent.id === item.parentId) {
          parent.children.push(item);
        }
      });
    });

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
