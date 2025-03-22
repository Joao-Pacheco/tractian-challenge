import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../Search";
import { useCompaniesStore } from "@/store/companies.store";
import { useListStore } from "@/store/list.store";
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

describe("Search Component", () => {
  const mockSetList = jest.fn();
  const mockSetMainComponent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const mockedUseCompaniesStore = jest.mocked(useCompaniesStore);
    mockedUseCompaniesStore.mockReturnValue({
      companies: [{ id: "1", selected: true }],
    });

    const useListStoreMock = useListStore as unknown as jest.Mock;

    useListStoreMock.mockReturnValue({
      list: [],
      setList: mockSetList,
    });

    (useMainComponentStore as unknown as jest.Mock).mockReturnValue({
      setMainComponent: mockSetMainComponent,
    });
  });

  it("renders input and search icon", () => {
    render(<Search />);

    expect(
      screen.getByPlaceholderText("Buscar Ativo ou Local")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Buscar")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Buscar Ativo ou Local");

    fireEvent.change(input, { target: { value: "Teste" } });

    expect((input as HTMLInputElement).value).toBe("Teste");
  });

  it("triggers search when Enter key is pressed", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [{ id: "1", name: "Result 1" }] }),
      })
    ) as jest.Mock;

    render(<Search />);
    const input = screen.getByPlaceholderText("Buscar Ativo ou Local");

    fireEvent.change(input, { target: { value: "Teste" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => expect(mockSetList).toHaveBeenCalled());
  });
});
