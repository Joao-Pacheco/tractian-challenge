import { render, screen } from "@testing-library/react";
import { useMainComponentStore } from "@/store/mainComponent.store";
import MainComponent from "../MainComponent";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

jest.mock("@/store/mainComponent.store", () => ({
  useMainComponentStore: jest.fn(),
}));

jest.mock("@/utils/gets/getStausColor", () => ({
  getStatusColor: jest.fn(() => "bg-green-500"),
}));

jest.mock("@/utils/gets/getSensorType", () => ({
  getSensorType: jest.fn(() => "Sensor Type"),
}));

describe("MainComponent", () => {
  it("renders default state when no component is selected", () => {
    (useMainComponentStore as unknown as jest.Mock).mockReturnValue({
      mainComponent: {},
    });
    render(<MainComponent />);

    expect(screen.getByText("Selecione um componente")).toBeInTheDocument();
  });

  it("renders component name when a component is selected", () => {
    (useMainComponentStore as unknown as jest.Mock).mockReturnValue({
      mainComponent: {
        name: "Motor XYZ",
        status: "active",
        sensorType: "energy",
        gatewayId: "GW-123",
      },
    });
    render(<MainComponent />);

    expect(screen.getByText("Motor XYZ")).toBeInTheDocument();
    expect(screen.getByText("Tipo de Equipamento")).toBeInTheDocument();
    expect(screen.getByText("Energia")).toBeInTheDocument();
    expect(screen.getByText("Sensor Type")).toBeInTheDocument();
  });

  it("renders motor image when component name starts with 'Motor'", () => {
    (useMainComponentStore as unknown as jest.Mock).mockReturnValue({
      mainComponent: {
        name: "Motor ABC",
        status: "active",
        sensorType: "energy",
      },
    });
    render(<MainComponent />);

    const motorImage = screen.getByAltText("Motor");
    expect(motorImage).toBeInTheDocument();
  });

  it("renders upload icon when component name is not 'Motor'", () => {
    (useMainComponentStore as unknown as jest.Mock).mockReturnValue({
      mainComponent: {
        name: "Sensor XYZ",
        status: "active",
        sensorType: "energy",
      },
    });
    render(<MainComponent />);

    const uploadIcon = screen.getByAltText("Upload");
    expect(uploadIcon).toBeInTheDocument();
  });
});
