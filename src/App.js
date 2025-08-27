import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import YoutubeSection from "./components/YoutubeSection"; // exact path


import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <YoutubeSection />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
