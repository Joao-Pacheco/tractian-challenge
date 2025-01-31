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

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    let list = await fetchTree(id);

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
