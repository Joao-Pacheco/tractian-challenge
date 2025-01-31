import { NextResponse } from "next/server";

const fetchData = async (url: string, errorMessage: string) => {
  const apiUrl = "http://localhost:3000/";

  try {
    const response = await fetch(apiUrl + url);

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    const { data } = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch the data. Status: ${error.status}`);
  }
};

const fetchTree = async (id: string) => {
  return fetchData(`/api/tree/${id}`, "Error fetching tree");
};
function searchTree(
  list: Location[] | Component[],
  searchTerm: string
): Array<Location | Component> {
  const result: Array<Location | Component> = [];

  function search(
    item: Location | Component,
    parent: Location | Component
  ): void {
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      if (!result.find((item) => item.id === parent.id)) {
        result.push(parent);
      }
    } else if (item.children) {
      for (const child of item.children) {
        search(child, parent);
      }
    }
  }

  for (const item of list) {
    search(item, item);
  }

  return result;
}

export async function GET(
  request: Request,
  context: { params: { id: string; term: string } }
) {
  const { id, term } = await context.params;

  try {
    let list = await fetchTree(id);

    list = searchTree(list, term);
    if (list.length === 0) {
      list = [
        {
          id: 0,
          name: "Nenhum item encontrado",
          children: [],
        },
      ];
    }

    return NextResponse.json({ success: true, data: list }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching tree:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tree",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
