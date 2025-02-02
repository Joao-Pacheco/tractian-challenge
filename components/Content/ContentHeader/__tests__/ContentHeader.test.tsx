import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContentHeader from "../ContentHeader";
import { useCompaniesStore } from "@/store/companies.store";
import { useListStore } from "@/store/list.store";
import { useMainComponentStore } from "@/store/mainComponent.store";
import { useFiltersStore } from "@/store/filters.store";
import { createTreeView } from "@/utils/createTreeView/createTreeView";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

jest.mock("@/store/companies.store", () => ({
  useCompaniesStore: jest.fn(() => ({
    companies: [{ id: "1", name: "Company 1", selected: true }],
  })),
}));

jest.mock("@/store/list.store", () => ({
  useListStore: jest.fn(),
}));

jest.mock("@/store/mainComponent.store", () => ({
  useMainComponentStore: jest.fn(),
}));

jest.mock("@/store/filters.store", () => ({
  useFiltersStore: jest.fn(),
}));

jest.mock("@/utils/createTreeView/createTreeView", () => ({
  createTreeView: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({ data: [{ id: "1", name: "Filtered Location" }] }),
  })
) as jest.Mock;

const mockSetList = jest.fn();
const mockSetMainComponent = jest.fn();
const mockSelectFilter = jest.fn();
const mockRemoveSelectedFilter = jest.fn();

describe("ContentHeader Component", () => {
  beforeEach(() => {
    (useCompaniesStore as unknown as jest.Mock).mockReturnValue({
      companies: [{ id: "1", name: "Company 1", selected: true }],
    });
    (useListStore as unknown as jest.Mock).mockReturnValue({
      setList: mockSetList,
    });
    (useMainComponentStore as unknown as jest.Mock).mockReturnValue({
      setMainComponent: mockSetMainComponent,
    });
    (useFiltersStore as unknown as jest.Mock).mockReturnValue({
      filters: [
        {
          id: "1",
          name: "Energy",
          type: "energy",
          selected: false,
          srcImageIcon: "/energy-icon.svg",
        },
        {
          id: "2",
          name: "Critical",
          type: "critical",
          selected: false,
          srcImageIcon: "/critical-icon.svg",
        },
      ],
      selectFilter: mockSelectFilter,
      removeSelectedFilter: mockRemoveSelectedFilter,
    });
  });

  it("renders the component with the selected company name", () => {
    render(<ContentHeader />);

    expect(screen.getByText("Ativos")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Company 1"))
    ).toBeInTheDocument();
    expect(screen.getByText("Energy")).toBeInTheDocument();
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("calls searchByFilter when clicking on a filter button", async () => {
    render(<ContentHeader />);

    const energyButton = screen.getByText("Energy");

    fireEvent.click(energyButton);

    await waitFor(() => {
      expect(mockSetList).toHaveBeenCalledWith([]);
      expect(mockSetMainComponent).toHaveBeenCalledWith({});
      expect(mockSelectFilter).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith("api/filter/1/energy");
    });

    await waitFor(() => {
      expect(mockSetList).toHaveBeenCalledWith([
        { id: "1", name: "Filtered Location" },
      ]);
    });
  });

  it("removes the selected filter and calls createTreeView when clicking again", async () => {
    (useFiltersStore as unknown as jest.Mock).mockReturnValue({
      filters: [
        {
          id: "1",
          name: "Energy",
          type: "energy",
          selected: true,
          srcImageIcon: "/energy-icon.svg",
        },
      ],
      selectFilter: mockSelectFilter,
      removeSelectedFilter: mockRemoveSelectedFilter,
    });

    render(<ContentHeader />);

    const energyButton = screen.getByText("Energy");

    fireEvent.click(energyButton);

    await waitFor(() => {
      expect(mockRemoveSelectedFilter).toHaveBeenCalled();
      expect(createTreeView).toHaveBeenCalledWith(
        [{ id: "1", name: "Company 1", selected: true }],
        mockSetList
      );
    });
  });
});
