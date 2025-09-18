import React from "react";
import profile from "../img_2408.jpg"; 
import { FaInstagram, FaYoutube } from "react-icons/fa";

function Hero() {
  return (
    <section id="hero">
      <div className="hero-container">
        
        <div className="socials-wrapper">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/ddhhyyeeyy/"
            target="_blank"
            rel="noreferrer"
            className="social-link"
          >
            <FaInstagram className="icon" /> Instagram
          </a>

          {/* Profile */}
          <img src={profile} alt="Dhyey Patel" className="profile-img" />

          {/* YouTube */}
          <a
            href="https://www.youtube.com/channel/UCknPQ1aaPOTUCuy6wb2ufJQ/"
            target="_blank"
            rel="noreferrer"
            className="social-link youtube"
          >
            <FaYoutube className="icon" /> YouTube
          </a>
        </div>

        <h1>
          Hey, I'm <span className="highlight-name">Dhyey</span>
        </h1>
        <p className="lead">
          <a
            href="https://github.com/dhyeypatel03/"
            className="role-link"
            target="_blank"
            rel="noreferrer"
          >
            Web Developer
          </a>{" "}
          |{" "}
          <a
            href="https://youtu.be/wXZ2Zcu951M"
            className="role-link"
            target="_blank"
            rel="noreferrer"
          >
            Tech Explorer
          </a>{" "}
          |{" "}
          <a
            href="https://youtu.be/5tB2ymAj74A"
            className="role-link"
            target="_blank"
            rel="noreferrer"
          >
            Creative Soul
          </a>
        </p>
      </div>
    </section>
  );
}

export default Hero;
