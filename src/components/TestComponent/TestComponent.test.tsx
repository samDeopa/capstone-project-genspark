import { render, Screen } from "@testing-library/react";
import TestComponent from "./TestComponent";

describe("Project", () => {
  test("renders render component without crashing", () => {
    const { container } = render(<TestComponent />);

    let inputElements = container.querySelectorAll("input");

    expect(inputElements.length).toBe(2);

    // expect(screen.getByText('User Login')).toBeInTheDocument();
  });
});
