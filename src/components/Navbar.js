import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../App";

function Navbar() {
    const { dispatch } = useContext(AppContext);

    const toggleTheme = () => {
      dispatch({ type: "toggleTheme" });
    };

    return (
        <NavBar>
            <NavMenu>
                <NavLink><a href='/'>Home</a></NavLink>
                <NavLink><a href='/About'>About Us</a></NavLink>
                <NavLink><a href='/API'>API</a></NavLink>
            </NavMenu>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </NavBar>
    )
}

const NavBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.navColor};
  min-height: 50px;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${props => props.theme.textColor};
  list-style: none;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const NavLink = styled.div`
  display: block;
  padding: 1rem;
  transition: 250ms ease background-color;
  &:hover {
    cursor: pointer;
    background-color: skyblue;
  }
`;

export default Navbar;