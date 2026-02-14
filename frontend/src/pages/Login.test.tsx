import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import * as client from "../api/client";

jest.mock("../api/client");

test("renders login form", () => {
  render(<Login />);
  expect(screen.getByLabelText("Username")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByText("Sign In")).toBeInTheDocument();
});

test("submits login form and shows response message", async () => {
  (client.login as jest.Mock).mockResolvedValue({
    message: "Login endpoint placeholder",
    success: false,
  });

  render(<Login />);

  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "testpass" },
  });
  fireEvent.click(screen.getByText("Sign In"));

  await waitFor(() => {
    expect(screen.getByText("Login endpoint placeholder")).toBeInTheDocument();
  });

  expect(client.login).toHaveBeenCalledWith({
    username: "testuser",
    password: "testpass",
  });
});

test("shows error message on login failure", async () => {
  (client.login as jest.Mock).mockRejectedValue(new Error("Login failed"));

  render(<Login />);

  fireEvent.change(screen.getByLabelText("Username"), {
    target: { value: "user" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "pass" },
  });
  fireEvent.click(screen.getByText("Sign In"));

  await waitFor(() => {
    expect(screen.getByText("Login failed")).toBeInTheDocument();
  });
});
