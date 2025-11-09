// set current year
document.getElementById('year').textContent = new Date().getFullYear();

// load projects.json and render cards
fetch('projects.json')
  .then(r => {
    if (!r.ok) throw new Error('No projects.json found');
    return r.json();
  })
  .then(data => {
    const cont = document.getElementById('projectsContainer');
    if (!data.projects || data.projects.length === 0) {
      cont.innerHTML = '<p>No projects yet — check back soon!</p>';
      return;
    }
    cont.innerHTML = data.projects.map(p => `
      <article class="project-card">
        <h3>${p.title}</h3>
        <p>${p.summary || ''}</p>
        ${p.tech ? `<p><small>Tech: ${p.tech.join(', ')}</small></p>` : ''}
        ${p.link ? `<p><a href="${p.link}" target="_blank">View</a></p>` : ''}
      </article>
    `).join('');
  })
  .catch(err => {
    document.getElementById('projectsContainer').innerHTML = '<p>Projects not available.</p>';
    console.warn(err);
  });
