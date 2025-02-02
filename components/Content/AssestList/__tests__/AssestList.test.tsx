import { render, screen } from "@testing-library/react";
import AssestList from "../AssestList";
import { useCompaniesStore } from "@/store/companies.store";
import { useListStore } from "@/store/list.store";
import { createTreeView } from "@/utils/createTreeView/createTreeView";
import { useMainComponentStore } from "@/store/mainComponent.store";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

jest.mock("@/store/companies.store", () => ({
  useCompaniesStore: jest.fn(),
}));

jest.mock("@/store/list.store", () => ({
  useListStore: jest.fn(),
}));

jest.mock("@/store/mainComponent.store", () => ({
  useMainComponentStore: jest.fn(),
}));

jest.mock("@/utils/createTreeView/createTreeView", () => ({
  createTreeView: jest.fn(),
}));

describe("AssestList", () => {
  const mockCompanies = [
    { id: 1, name: "Company A" },
    { id: 2, name: "Company B" },
  ];

  const mockList = [
    { id: 1, name: "Asset 1", children: [] },
    { id: 2, name: "Asset 2", children: [] },
  ];

  const mockMainComponent = {
    id: 1,
    name: "Asset 1",
    children: [],
  };

  const mockSetList = jest.fn();
  const mockSetMainComponent = jest.fn();

  beforeEach(() => {
    (useCompaniesStore as unknown as jest.Mock).mockReturnValue({
      companies: mockCompanies,
    });

    (useListStore as unknown as jest.Mock).mockReturnValue({
      list: mockList,
      setList: mockSetList,
    });

    (useMainComponentStore as unknown as jest.Mock).mockReturnValue({
      setMainComponent: mockSetMainComponent,
      mainComponent: mockMainComponent,
    });
  });

  it("renders the component correctly", () => {
    render(<AssestList />);

    const search = screen.getByRole("search");
    expect(search).toBeInTheDocument();

    mockList.forEach((item) => {
      const asset = screen.getByText(item.name);
      expect(asset).toBeInTheDocument();
    });
  });

  it("displays the loading spinner when the list is empty", () => {
    (useListStore as unknown as jest.Mock).mockReturnValue({
      list: [],
      setList: mockSetList,
    });

    render(<AssestList />);

    const spinner = screen.getByRole("img", { name: /loading/i });
    expect(spinner).toBeInTheDocument();
  });

  it("calls createTreeView when companies change", () => {
    render(<AssestList />);

    expect(createTreeView).toHaveBeenCalledWith(mockCompanies, mockSetList);
  });
});
