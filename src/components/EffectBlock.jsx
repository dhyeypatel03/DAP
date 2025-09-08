// src/components/EffectBlock.jsx
import React, { useRef, useEffect, useState } from "react";
import Crosshair from "./Crosshair";
import { gsap } from "gsap";

export default function EffectBlock() {
  const containerRef = useRef(null);
  const ctaRef = useRef(null);
  const [ctaText, setCtaText] = useState("YouTube");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e) => {
      // default while moving inside container
      setCtaText("Shoot now");

      // compute distance from mouse to CTA center (to show "Shoot here")
      if (ctaRef.current) {
        const ctaBounds = ctaRef.current.getBoundingClientRect();
        const containerBounds = container.getBoundingClientRect();

        const mouseX = e.clientX - containerBounds.left;
        const mouseY = e.clientY - containerBounds.top;

        const ctaCenterX = ctaBounds.left - containerBounds.left + ctaBounds.width / 2;
        const ctaCenterY = ctaBounds.top - containerBounds.top + ctaBounds.height / 2;

        const dx = mouseX - ctaCenterX;
        const dy = mouseY - ctaCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 90) {
          // near the CTA
          setCtaText("Shoot here");
          ctaRef.current.style.transform = "translate(-50%, -50%) scale(1.06)";
          ctaRef.current.style.boxShadow = "0 18px 40px rgba(0,0,0,0.45)";
        } else {
          // not near CTA
          setCtaText("Shoot now");
          ctaRef.current.style.transform = "translate(-50%, -50%) scale(1)";
          ctaRef.current.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
        }
      }
    };

    const onMouseLeave = () => {
      setCtaText("YouTube");
      if (ctaRef.current) {
        ctaRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        ctaRef.current.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
      }
    };

    const onContainerClick = (e) => {
      // Create a quick "Shoot!" floating text at click location
      const containerBounds = container.getBoundingClientRect();
      const x = e.clientX - containerBounds.left;
      const y = e.clientY - containerBounds.top;

      const shotEl = document.createElement("div");
      shotEl.textContent = "Shoot!";
      Object.assign(shotEl.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
        color: "#fff",
        fontWeight: 800,
        pointerEvents: "none",
        zIndex: 10005,
        fontSize: "18px",
        opacity: 0,
        padding: "6px 10px",
        borderRadius: "6px",
        background: "rgba(0,0,0,0.45)"
      });

      container.appendChild(shotEl);

      // small pop + fade animation, then remove
      gsap.to(shotEl, { opacity: 1, y: "-=8", scale: 1.05, duration: 0.12 });
      gsap.to(shotEl, {
        opacity: 0,
        y: "-=34",
        scale: 1.08,
        duration: 0.85,
        delay: 0.12,
        onComplete: () => shotEl.remove()
      });
    };

    // CTA hover handlers (hovering changes the CTA text)
    const cta = ctaRef.current;
    const onCtaEnter = () => setCtaText("YouTube channel");
    const onCtaLeave = () => setCtaText("YouTube");

    // Attach listeners
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("click", onContainerClick);

    if (cta) {
      cta.addEventListener("mouseenter", onCtaEnter);
      cta.addEventListener("mouseleave", onCtaLeave);
    }

    // cleanup
    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("click", onContainerClick);
      if (cta) {
        cta.removeEventListener("mouseenter", onCtaEnter);
        cta.removeEventListener("mouseleave", onCtaLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "420px",                        // a bit taller
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(135deg,#0b2b3a 0%, #0f2740 100%)", // not black
        borderRadius: "16px",
        margin: "40px auto",                    // space above & below
        maxWidth: "1200px",                     // wider
        padding: "16px"
      }}
    >
      {/* Crosshair lives in this container and receives containerRef */}
      <Crosshair containerRef={containerRef} color="#00ffd5" />

      {/* Centered CTA */}
      <a
        ref={ctaRef}
        href="https://youtu.be/jXLuBvMfrz4/"
        target="_blank"
        rel="noreferrer"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 10002,
          padding: "14px 28px",
          background: "#ff0000",
          color: "#fff",
          borderRadius: "999px",
          textDecoration: "none",
          fontWeight: 800,
          fontSize: "16px",
          letterSpacing: "0.4px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          transition: "transform .15s ease, box-shadow .15s ease, background .15s",
          cursor: "pointer"
        }}
      >
        My Best Video!!
      </a>
    </div>
  );
}
