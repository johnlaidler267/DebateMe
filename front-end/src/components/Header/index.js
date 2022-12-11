import { useEffect, useRef, useState, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Form } from 'react-bootstrap';
import { HeaderText, Header, TM, User } from "./TitleElements";
import { AuthContext } from '../../context/AuthProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// make a title for top of the web page
const Title = ({ userloggedIn }) => {
    // const [ scrollUp, setScrollUp ] = useState(null);
    // const searchRef = useRef();
    const { Auth } = useContext(AuthContext);

    // useEffect(() => {
    //     const threshold = 20;
    //     let lastScrollY = window.pageYOffset;
    //     let ticking = false;
      
    //     const updateScrollDir = () => {
    //       const scrollY = window.pageYOffset;
    
    //       if (scrollY === 0) {
    //         searchRef.current.style.backgroundColor = 'transparent';
    //       } else {
    //         searchRef.current.style.backgroundColor = 'rgba(57, 63, 77, 0.8)';
    //       }
    
    //       if (Math.abs(scrollY - lastScrollY) < threshold) {
    //         ticking = false;
    //         return;
    //       }
    //       setScrollUp(scrollY < lastScrollY ? true : false);
    //       if (scrollUp) {
    //         searchRef.current.className = 'search-bar slide-down';
    //       } else {
    //         searchRef.current.className = 'search-bar slide-up'
    //       }
                     
    //       lastScrollY = scrollY > 0 ? scrollY : 0;
    //       ticking = false;
    //     };
        
    //     const onScroll = () => {
    //       if (!ticking) {
    //         window.requestAnimationFrame(updateScrollDir);
    //         ticking = true;
    //       }
    //     };
        
    //     window.addEventListener("scroll", onScroll);
      
    //     return () => window.removeEventListener("scroll", onScroll);  
    //   }, [scrollUp]);
    
    //         <div className='search-bar' ref={searchRef}>
    //             <Form className='d-flex justify-content-end align-items-center' style={{ width: "100%" }}>
    //                 <Form.Group controlId="formElectionName">
    //                     <Form.Control type="text" placeholder="Enter election name" style={{
    //                         width: "24vw",
    //                         height: 45,
    //                         borderTopLeftRadius: "1.25rem",
    //                         borderBottomLeftRadius: "1.25rem",
    //                         borderTopRightRadius: 0,
    //                         borderBottomRightRadius: 0
    //                     }} />
    //                 </Form.Group>
    //                 <Button variant="secondary" type="submit" style={{
    //                     height: 45,
    //                     borderTopLeftRadius: 0,
    //                     borderBottomLeftRadius: 0,
    //                     borderTopRightRadius: "1.25rem",
    //                     borderBottomRightRadius: "1.25rem",
    //                     backgroundColor: "#feda6a",
    //                     color: "#393f4d"
    //                 }}>
    //                     <SearchIcon />
    //                 </Button>
    //             </Form>
    //         </div>
    return (
      <>
            <Header>
                <HeaderText>
                    <div className={ userloggedIn ? 'd-flex justify-content-center logo' : 'd-flex justify-content-center' } style={{ width: "140%" }}>
                        DebateMe<TM>TM</TM>🗳️
                    </div>
                    { userloggedIn && <User><AccountCircleIcon sx={{ fontSize: 40 }}/>{Auth.username}</User> }
                </HeaderText>
            </Header >
        </>
    );
};

export default Title;