import React, { useRef } from "react";

// Imports for your page sections
import Hero from "./components/Hero";
import About from "./components/About";

import Footer from "./components/Footer";
import YoutubeSection from "./components/YoutubeSection";
import Projects from "./components/Projects";
import SplitText from "./components/SplitText";
import VariableProximity from "./components/VariableProximity";
import CinematicGallery from "./components/CinematicGallery";
import ScrollReveal from "./components/ScrollReveal";
import Navigation from "./components/Navigation";
import ScrollAnimations from "./components/ScrollAnimations";

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
      <ScrollAnimations />
      <Navigation />
      {/* All of your page content now goes inside this <main> tag */}
      <main className="page-content">
        <Hero />

        <div id="about">
          <About />
        </div>
        <div className="sanskrit-section">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={false}
            baseRotation={0}
          >
                 कर्मण्येवाधिकारस्ते मा फलेषु कदाचन

                (karmaṇyevādhikāraste mā phaleṣu kadācana)

                This timeless wisdom teaches us to focus on our actions, 
                not the fruits they may bear. Travel is a perfect reflection 
                of this philosophy—a reminder that true discovery lies not in
                the destination, but in the richness of the journey itself.     

          </ScrollReveal>
        </div>

        <div id="gallery">
          <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "white" }}>
            My Travel Journey
          </h1>
          <CinematicGallery />
        </div>
        <div id="videos">
          <YoutubeSection />
        </div>
        <div id="projects">
          <Projects />
        </div>
        
        <div className="app-container">
          {/* Main Heading */}
          <SplitText
            text="It's me, amigos, DAP !!"
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
        

        <Footer />
      </main>
    </div>
  );
}

export default App;
