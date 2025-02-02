import { render, screen } from "@testing-library/react";
import ContentHeader from "../Content";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("ContentHeader Component", () => {
  it("renders children correctly", () => {
    render(
      <ContentHeader>
        <div data-testid="child-element">Test Child</div>
      </ContentHeader>
    );

    const childElement = screen.getByTestId("child-element");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Test Child");
  });
});
