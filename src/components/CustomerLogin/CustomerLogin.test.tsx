import { render, Screen } from "@testing-library/react";
import CustomerLogin from "./CustomerLogin";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const mockedUseNavigate = jest.fn();
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
}));

describe("Project", () => {
  it("string", () => {
    const { container } = render(<CustomerLogin />);
    // eslint-disable-next-line testing-library/no-container
    let inputElements = container.querySelectorAll("input");

    expect(inputElements.length).toBe(2);
  });
});
