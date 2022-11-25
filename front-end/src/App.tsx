import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ElectionSearch from "./pages/election-search";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import CreateElection from "./pages/create-election";
import VoteHistory from "./pages/vote-history";
import Messages from "./pages/messages";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/election-search" element={<ElectionSearch />} />
        <Route path="/create-election" element={<CreateElection />} />
        <Route path="/vote-history" element={<VoteHistory />} />
        <Route path="/view-profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
