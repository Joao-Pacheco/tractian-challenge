import { NextResponse } from "next/server";

async function fetchCompanies(): Promise<Company[]> {
  const response = await fetch("https://fake-api.tractian.com/companies");

  if (!response.ok) {
    throw new Error(`Failed to fetch companies. Status: ${response.status}`);
  }

  return response.json();
}

export async function GET() {
  try {
    const companies = await fetchCompanies();
    const updatedCompanies = companies.map((item, index) => ({
      ...item,
      selected: index === 0,
    }));

    return NextResponse.json(
      { success: true, data: updatedCompanies },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching companies:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch companies",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
