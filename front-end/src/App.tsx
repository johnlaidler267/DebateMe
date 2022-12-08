import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Debate from "./pages/debate/debate";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import CreateElection from "./pages/create-election";
import VoteHistory from "./pages/vote-history";
import Messages from "./pages/messages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Post from "./components/Post";
import Login from "./pages/login";
import { AuthContext } from "./context/AuthProvider";
import { PrivateRoute } from "./context/PrivateRoute";

/*
  This is the main component of the app. It is the parent of all other components.
*/

function App() {
  const [ Auth, setAuth ] = useState();

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const token = JSON.parse(sessionStorage.getItem('token') || "");
      setAuth(token);    
    }

    if (localStorage.getItem('token')) {
      const token = JSON.parse(localStorage.getItem('token') || "");
      setAuth(token);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
        <Router>
          { !Auth ? <Header userloggedIn={false} /> : <Header userloggedIn={true} /> }
          { !Auth ? <Navbar userloggedIn={false} /> : <Navbar userloggedIn={true} /> }
          <Routes>
            <Route path="/" element={<Debate />} />
            <Route path="/debate" element={<Debate />} />
            <Route path='/post/:postId' element={<Post />} />
            <Route path="/create-election" element={<PrivateRoute><CreateElection /></PrivateRoute>} />
            <Route path="/vote-history" element={<PrivateRoute><VoteHistory /></PrivateRoute>} />
            <Route path="/view-profile" element={<Profile />} />
            <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
