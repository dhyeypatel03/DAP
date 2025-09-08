import React, { useEffect, useState } from "react";

function Projects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/DhyeyPatel/repos?sort=updated&per_page=6")
      .then(res => res.json())
      .then(data => {
        setRepos(data);
      })
      .catch(err => console.error("GitHub API error:", err));
  }, []);

  return (
    <section className="py-5 bg-light" id="projects">
      <div className="container">
        <h2 className="mb-4">My GitHub Projects</h2>
        <div className="row g-4">
          {repos.length > 0 ? (
            repos.map(repo => (
              <div className="col-md-4" key={repo.id}>
                <div className="card project-card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{repo.name}</h5>
                    <p className="card-text">
                      {repo.description || "No description available."}
                    </p>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto btn btn-primary"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading projects...</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
