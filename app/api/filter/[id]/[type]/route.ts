import { NextResponse } from "next/server";

const fetchData = async (url: string, errorMessage: string) => {
  const response = await fetch(`http://localhost:3000/${url}`);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  const { data } = await response.json();
  return data;
};

const fetchTree = async (id: string) => {
  return fetchData(`api/tree/${id}`, "Error fetching tree");
};

const searchType = (type: string, item: Location | Component) => {
  if (type === "energy" && item.sensorType) {
    return item.sensorType.toLowerCase() === "energy";
  }
  if (type === "critical" && item.sensorType) {
    return item.status.toLowerCase().includes("alert");
  }
  return false;
};

const searchTree = (list: Location[] | Component[], type: string) => {
  const filterItems = (items: Location[] | Component[]) => {
    return items.reduce<Array<Location | Component>>((acc: any, item) => {
      if (searchType(type, item)) {
        acc.push(item);
      } else if (item.children) {
        const filteredChildren = filterItems(item.children);
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

  return filterItems(list);
};

export async function GET(
  request: Request,
  context: { params: { id: string; type: string } }
) {
  const { id, type } = context.params;

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
