import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login';
import userEvent from "@testing-library/user-event";

describe("When the <Login> component is rendered", () => {
    it("must have a username and password field, and a Login Button", ()=>{
        render(<Login setCookie={Function}></Login>)
        
        expect(screen.getByRole('textbox')).toHaveAttribute("name", "username");
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
    
    })
})

