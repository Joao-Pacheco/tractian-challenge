import { render, screen } from "@testing-library/react";
import ContainerMain from "../ContainerMain";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("ContainerMain Component", () => {
  it("renders children correctly", () => {
    render(
      <ContainerMain>
        <p>Test Content</p>
      </ContainerMain>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("has the correct classes for styling", () => {
    const { container } = render(
      <ContainerMain>
        <p>Styled Test</p>
      </ContainerMain>
    );

    expect(container.firstChild).toHaveClass(
      "shadow-md bg-white m-3 rounded-sm block p-3 flex flex-col h-[calc(100vh-4rem)]"
    );
  });
});
