import { serverUrl } from "@/utils/gets/serverUrl";
import { NextResponse } from "next/server";

const fetchData = async (url: string, errorMessage: string) => {
  const apiUrl = `${serverUrl}/`;

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

  const searchItems = (items: Location[] | Component[]) => {
    return items.reduce<Array<Location | Component>>((acc: any, item) => {
      if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        acc.push(item);
      } else if (item.children) {
        const filteredChildren = searchItems(item.children);
        if (filteredChildren.length > 0) {
          acc.push({
            ...item,
            children: item.children ? filteredChildren : null,
          });
        }
      }
      return acc;
    }, []);
  };

  return searchItems(list);
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
