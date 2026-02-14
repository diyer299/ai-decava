import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders navigation links", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Resources Table")).toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
});

test("renders home page by default", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText("Decava")).toBeInTheDocument();
  expect(screen.getByText("Welcome to the Decava application.")).toBeInTheDocument();
});

test("renders login page at /login", () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  expect(screen.getByLabelText("Username")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
});
