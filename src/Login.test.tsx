
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';
import userEvent from "@testing-library/user-event";

describe("When the <Login> component is rendered", () => {
    it("must have a username and password field, and a Login Button", ()=>{
        render(<Login setCookie={Function}></Login>)
        
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    
    })
})

describe("When the user try to Login without typing the password", () => {
    it("must display an warning message", async ()=>{
        render(<Login setCookie={Function}></Login>)
        
        await userEvent.type(screen.getByPlaceholderText('Username'), "user1");
        await userEvent.click(screen.getByText("Login"));

        expect(screen.getByText("Please fill out all fields before continue")).toBeInTheDocument();
    })
})

describe("When the user try to Login without typing the username", () => {
    it("must display an warning message", async ()=>{
        render(<Login setCookie={Function}></Login>)
        
        await userEvent.type(screen.getByPlaceholderText('Password'), "1234");
        await userEvent.click(screen.getByText("Login"));

        expect(screen.getByText("Please fill out all fields before continue")).toBeInTheDocument();
    })
})

describe("When the user try to Login with wrong credentials", () => {
    it("must display error message", async ()=>{
        render(<Login setCookie={Function}></Login>)
        
        await userEvent.type(screen.getByPlaceholderText('Username'), "user1");
        await userEvent.type(screen.getByPlaceholderText('Password'), "1234");
        await userEvent.click(screen.getByText("Login"));

        expect(screen.getByRole("alert")).toBeInTheDocument();
        
    })
})
