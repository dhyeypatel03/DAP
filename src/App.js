import React, { useRef, Suspense, lazy } from "react";
import PerformanceOptimizer from "./components/PerformanceOptimizer";

// CSS imports
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy load components for better performance
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Footer = lazy(() => import("./components/Footer"));
const YoutubeSection = lazy(() => import("./components/YoutubeSection"));
const Projects = lazy(() => import("./components/Projects"));
const SplitText = lazy(() => import("./components/SplitText"));
const VariableProximity = lazy(() => import("./components/VariableProximity"));

const ScrollReveal = lazy(() => import("./components/ScrollReveal"));
const Navigation = lazy(() => import("./components/Navigation"));
const ScrollAnimations = lazy(() => import("./components/ScrollAnimations"));
const InstagramShowcase = lazy(() => import("./components/InstagramShowcase"));
const LatestVideo = lazy(() => import("./components/LatestVideo"));

function App() {
  const containerRef = useRef(null);

  const infoText = `I love traveling to new places and exploring the world. 
Adventure keeps me alive and curious. 
I enjoy learning new technologies and creating cool projects. 
Sharing knowledge and experiences motivates me every day. 
Life is all about growth, fun, and new memories!`;

  return (
    <div className="App">
      <PerformanceOptimizer />
      <Suspense fallback={<div style={{ opacity: 0 }}></div>}>
        <ScrollAnimations />
        <Navigation />

        {/* All of your page content now goes inside this <main> tag */}
        <main className="page-content">
          <Suspense fallback={<div style={{ opacity: 0, height: '50px' }}></div>}>
            <Hero />
          </Suspense>

          <div id="about">
            <Suspense fallback={<div style={{ opacity: 0, height: '50px' }}></div>}>
              <About />
            </Suspense>
          </div>

          <div id="latest-video">
            <Suspense fallback={<div style={{ opacity: 0, height: '50px' }}></div>}>
              <LatestVideo />
            </Suspense>
          </div>

          <div id="instagram">
            <Suspense fallback={<div style={{ opacity: 0, height: '50px' }}></div>}>
              <InstagramShowcase />
            </Suspense>
          </div>

          <div className="sanskrit-section">
            <Suspense fallback={<div style={{ opacity: 0, height: '50px' }}></div>}>
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
            </Suspense>
          </div>

          <div id="videos">
            <Suspense fallback={<div style={{ opacity: 0, height: '50px' }}></div>}>
              <YoutubeSection />
            </Suspense>
          </div>

          <div id="projects">
            <Suspense fallback={<div style={{ opacity: 0, height: '50px' }}></div>}>
              <Projects />
            </Suspense>
          </div>

          <div className="app-container">
            {/* Main Heading */}
            <Suspense fallback={<div style={{ opacity: 0, height: '50px' }}></div>}>
              <SplitText
                text="It's me, amigos, DAP !!"
                tag="h1"
                delay={100}
                duration={0.6}
                from={{ opacity: 0, y: 0, scale: 0.8 }}
                to={{ opacity: 1, y: 0, scale: 1.1 }}
              />
            </Suspense>

            {/* Info / About block - Only show on desktop */}
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
              <Suspense fallback={<div style={{ opacity: 0, height: '50px' }}></div>}>
                <VariableProximity
                  label={infoText}
                  className="variable-proximity-demo"
                  fromFontVariationSettings="'wght' 400, 'opsz' 14"
                  toFontVariationSettings="'wght' 1000, 'opsz' 72"
                  containerRef={containerRef}
                  radius={90}
                  falloff="linear"
                />
              </Suspense>
            </div>
          </div>

          <Suspense fallback={<div style={{ opacity: 0, height: '50px' }}></div>}>
            <Footer />
          </Suspense>
        </main>
      </Suspense>
    </div>
  );
}

export default App;
