import { useRef } from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";

const Navbar = ({ userloggedIn }) => {
    const logoutRef = useRef();

    const HandleLogout = () => {
        userloggedIn = false;
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/debate" activeStyle>
                        Debate
                    </NavLink>
                    <NavLink to="/create-election" activeStyle>
                        Create Debate
                    </NavLink>
                    <NavLink to="/view-profile" activeStyle>
                        Manage Profile
                    </NavLink>
                    <NavLink to="/messages" activeStyle>
                        Messages

                    </NavLink>
                    {
                        !userloggedIn ? (
                            <NavLink to="/sign-up" activeStyle>
                                Sign Up
                            </NavLink>
                        ) :
                            <NavLink to="/" onClick={HandleLogout} ref={logoutRef} activeStyle>
                                Log Out
                            </NavLink>
                    }
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;