import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import userEvent from "@testing-library/user-event";

describe("When the <Login> component is rendered", () => {
  it("must have a username and password field, and a Login Button", () => {
    render(<Login setCookie={Function}></Login>);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});

describe("When the user try to Login without typing the password", () => {
  it("must display an warning message", async () => {
    render(<Login setCookie={Function}></Login>);

    await userEvent.type(screen.getByPlaceholderText("Username"), "user1");
    await userEvent.click(screen.getByText("Login"));

    expect(
      screen.getByText("Please fill out all fields before continuing")
    ).toBeInTheDocument();
  });
});

describe("When the user try to Login without typing the username", () => {
  it("must display an warning message", async () => {
    render(<Login setCookie={Function}></Login>);

    await userEvent.type(screen.getByPlaceholderText("Password"), "1234");
    await userEvent.click(screen.getByText("Login"));

    expect(
      screen.getByText("Please fill out all fields before continuing")
    ).toBeInTheDocument();
  });
});

describe("When the user try to Login with wrong credentials", () => {
  it("must display error message", async () => {
    render(<Login setCookie={Function}></Login>);

    await userEvent.type(screen.getByPlaceholderText("Username"), "user1");
    await userEvent.type(screen.getByPlaceholderText("Password"), "1234");
    await userEvent.click(screen.getByText("Login"));

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("must receive an API response with status 401", async () => {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "user1",
        password: "1234",
      }),
    });
    expect(response.status).toEqual(401);
  });
});

describe("When the user try to Login with valid credentials", () => {
  it("must receive an API response with a property named token", async () => {
    const getUser = await fetch("https://fakestoreapi.com/users/1");
    const parsedUser = await getUser.json();
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: parsedUser.username,
        password: parsedUser.password,
      }),
    });
    const parsed = await response.json();

    expect(parsed).toHaveProperty("token");
  });
});
