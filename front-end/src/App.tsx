import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Debate from "./pages/debate";
import ElectionSearch from "./pages/election-search";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import CreateElection from "./pages/create-election";
import VoteHistory from "./pages/vote-history";
import Messages from "./pages/messages";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Debate />} />
        <Route path="/debate" element={<Debate />} />
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
