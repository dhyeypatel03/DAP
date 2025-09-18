import React, { useEffect, useState } from "react";
import "./Projects.css";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialProjectCount] = useState(6);

  useEffect(() => {
    fetch("https://api.github.com/users/dhyeypatel03/repos?sort=updated&per_page=12")
      .then(res => res.json())
      .then(data => {
        const filteredRepos = data.filter(repo => !repo.fork && repo.name !== 'dhyeypatel03');
        setRepos(filteredRepos);
      })
      .catch(err => console.error("GitHub API error:", err));
  }, []);

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      Python: '#3572A5',
      Java: '#b07219',
      HTML: '#e34c26',
      CSS: '#1572B6',
      React: '#61dafb',
      TypeScript: '#2b7489',
      C: '#555555',
      'C++': '#f34b7d',
      Go: '#00ADD8',
      Rust: '#dea584',
      PHP: '#4F5D95'
    };
    return colors[language] || '#8b949e';
  };

  return (
    <section className="projects-section">
      <div className="projects-title">
        My Projects
      </div>
      
      <div className="projects-grid">
        {repos.length > 0 ? (
          repos.map((repo, idx) => {
            return (
              <div
                key={repo.id}
                className="project-card"
              >
              <div className="project-header">
                <h3 className="project-name">{repo.name}</h3>
                {repo.language && (
                  <span 
                    className="project-language"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  >
                    {repo.language}
                  </span>
                )}
              </div>
              
              <p className="project-description">
                {repo.description || "No description available."}
              </p>
              
              <div className="project-footer">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  View Code
                </a>
              </div>
              </div>
            );
          })
        ) : (
          <div className="loading-projects">Loading projects...</div>
        )}
      </div>


    </section>
  );
}

export default Projects;
