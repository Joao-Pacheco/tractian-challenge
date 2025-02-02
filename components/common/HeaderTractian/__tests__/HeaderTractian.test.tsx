import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderTractian from "../HeaderTractian";
import "@testing-library/jest-dom";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("@/store/companies.store", () => ({
  useCompaniesStore: jest.fn(),
}));

jest.mock("@/store/filters.store", () => ({
  useFiltersStore: jest.fn(),
}));

describe("HeaderTractian", () => {
  const mockCompanies = [
    { id: 1, name: "Company A", selected: false },
    { id: 2, name: "Company B", selected: true },
  ];

  const mockSelectCompany = jest.fn();
  const mockRemoveSelectedFilter = jest.fn();

  beforeEach(() => {
    require("@/store/companies.store").useCompaniesStore.mockReturnValue({
      companies: mockCompanies,
      setCompanies: jest.fn(),
      selectCompany: mockSelectCompany,
    });

    require("@/store/filters.store").useFiltersStore.mockReturnValue({
      removeSelectedFilter: mockRemoveSelectedFilter,
    });
  });

  it("renders the logo and company buttons", () => {
    render(<HeaderTractian />);

    const logo = screen.getByAltText("Tractian Logo");
    expect(logo).toBeInTheDocument();

    mockCompanies.forEach((company) => {
      const button = screen.getByText(`${company.name} Unit`);
      expect(button).toBeInTheDocument();
    });
  });

  it("calls handleSelectCompany when a company button is clicked", () => {
    render(<HeaderTractian />);

    const button = screen.getByText("Company A Unit");
    fireEvent.click(button);

    expect(mockRemoveSelectedFilter).toHaveBeenCalled();
    expect(mockSelectCompany).toHaveBeenCalledWith(mockCompanies[0]);
  });
});
