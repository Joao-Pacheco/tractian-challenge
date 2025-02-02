import React from "react";
import { render, screen } from "@testing-library/react";
import TreeView from "../TreeView";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

interface TreeViewItem {
  id: string;
  name: string;
  type: string;
  parentId: string | null;
  sensorId: string | null;
  sensorType: string | null;
  status: string | null;
  gatewayId: string | null;
  locationId: string | null;
  selected: boolean;
  children: null;
}

describe("TreeView Component", () => {
  it("renders the component and its children", () => {
    const item: TreeViewItem = {
      id: "1",
      name: "Location 1",
      type: "location",
      parentId: null,
      sensorId: null,
      sensorType: null,
      status: null,
      gatewayId: null,
      locationId: null,
      selected: false,
      children: null,
    };

    render(<TreeView item={item} key="1" />);

    expect(screen.getByText("Location 1")).toBeInTheDocument();
  });
});
