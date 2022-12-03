import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderText = styled.nav`
  background: #393f4d;
  color: white;
  size: 100%;
  text-size: 100%;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 3rem;
  text-align: center;
  display: flex;
`;

//Add a span element to the header text
export const span = styled.span`
  color: #feda6a;
`;


export const Header = styled.nav`
  background: white;
  justify-content: center;
`;

export const TM = styled.nav`
  font-size: 1rem;
  font-weight: 400; 
`;