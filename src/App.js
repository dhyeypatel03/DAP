import React, { useRef } from "react";

// Imports for your page sections
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import YoutubeSection from "./components/YoutubeSection";
import EffectBlock from "./components/EffectBlock";
import SplitText from "./components/SplitText";
import VariableProximity from "./components/VariableProximity";

// Import the Glitch component itself

// CSS imports
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const containerRef = useRef(null);

  const infoText = `I love traveling to new places and exploring the world. 
Adventure keeps me alive and curious. 
I enjoy learning new technologies and creating cool projects. 
Sharing knowledge and experiences motivates me every day. 
Life is all about growth, fun, and new memories!`;

  return (
    <div className="App">
      {/* All of your page content now goes inside this <main> tag */}
      <main className="page-content">
        <Navbar />
        <Hero />

        <div className="app-container">
          {/* Main Heading */}
          <SplitText
            text="Hello, PEOOPPLE !!"
            tag="h1"
            delay={100}
            duration={0.6}
            from={{ opacity: 0, y: 0, scale: 0.8 }}
            to={{ opacity: 1, y: 0, scale: 1.1 }}
          />

          {/* Info / About block */}
          <div
            ref={containerRef}
            className="info-block-container"
            style={{
              position: "relative",
              marginTop: "60px",
              lineHeight: "1.6em",
              maxWidth: "1400px",
              fontSize: "2.4rem",
            }}
          >
            <VariableProximity
              label={infoText}
              className="variable-proximity-demo"
              fromFontVariationSettings="'wght' 400, 'opsz' 14"
              toFontVariationSettings="'wght' 1000, 'opsz' 72"
              containerRef={containerRef}
              radius={90}
              falloff="linear"
            />
          </div>
        </div>

        <About />
        <EffectBlock />
        <YoutubeSection />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;