import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/debate" activeStyle>
                        Debate
                    </NavLink>
                    <NavLink to="/create-election" activeStyle>
                        Create Election
                    </NavLink>
                    <NavLink to="/vote-history" activeStyle>
                        Voting History
                    </NavLink>
                    <NavLink to="/view-profile" activeStyle>
                        Manage Profile
                    </NavLink>
                    <NavLink to="/messages" activeStyle>
                        Messages
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                    <NavLink to="/test" activeStyle>
                        Test
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;