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

const searchType = (type: string, item: Location | Component) => {
  if (type === "energy" && item.sensorType) {
    console.log(type);

    return item.sensorType.toLowerCase() === "energy";
  }
  if (type === "critical" && item.sensorType) {
    return item.status.toLowerCase().includes("alert");
  }
};
function searchTree(
  list: Location[] | Component[],
  type: string
): Array<Location | Component> {
  const filterItems = (
    items: Location[] | Component[]
  ): Location[] | Component[] => {
    return items.reduce<Location[] | Component[]>((accumulator: any, item) => {
      if (searchType(type, item)) {
        accumulator.push(item);
      } else if (item.children) {
        const filteredChildren = filterItems(item.children);
        if (filteredChildren.length > 0) {
          accumulator.push({ ...item, children: filteredChildren });
        }
      }
      return accumulator;
    }, []);
  };

  const result = filterItems(list);
  return result;
}

export async function GET(
  request: Request,
  context: { params: { id: string; type: string } }
) {
  const { id, type } = await context.params;

  try {
    let list = await fetchTree(id);

    list = searchTree(list, type);
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
