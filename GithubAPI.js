import fs from 'fs';
import fetch from 'node-fetch';

const OUTPUT_FILE = './public/github-projects.json';
const GITHUB_USERNAME = 'dhyeypatel03';

async function fetchRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    const data = await response.json();

    const latestRepos = data
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 100)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language
      }));

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(latestRepos, null, 2));
    console.log('GitHub projects saved to github-projects.json');
  } catch (err) {
    console.error('Error fetching GitHub repos:', err);
  }
}

fetchRepos();
