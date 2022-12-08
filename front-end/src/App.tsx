import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Debate from "./pages/debate/debate";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import CreateElection from "./pages/create-election";
import VoteHistory from "./pages/vote-history";
import Messages from "./pages/messages";
// import bootstrap css file to make it available to all components
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Post from "./components/Post";
import Login from "./pages/login";

/*
  This is the main component of the app. It is the parent of all other components.
*/

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Debate />} />
        <Route path="/debate" element={<Debate />} />
        <Route path='/post/:postId' element={<Post />} />
        <Route path="/create-election" element={<CreateElection />} />
        <Route path="/vote-history" element={<VoteHistory />} />
        <Route path="/view-profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
