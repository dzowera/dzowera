const filterBar = document.getElementById('filter-bar');
const projectsGrid = document.getElementById('work-grid');
const emptyState = document.getElementById('work-empty-state');

let activeFilter = 'All';

function renderFilters() {
  if (!filterBar) return;

  filterBar.innerHTML = '';

  workCategories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-chip${category === activeFilter ? ' active' : ''}`;
    button.textContent = category;
    button.dataset.filter = category;

    button.addEventListener('click', () => {
      activeFilter = category;
      renderFilters();
      renderProjects();
    });

    filterBar.appendChild(button);
  });
}

function renderProjects() {
  if (!projectsGrid) return;

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  projectsGrid.innerHTML = '';

  if (!filteredProjects.length) {
    if (emptyState) {
      emptyState.hidden = false;
    }
    return;
  }

  if (emptyState) {
    emptyState.hidden = true;
  }

  filteredProjects.forEach((project) => {
    const card = document.createElement('article');
    card.className = `work-card${project.featured ? ' featured' : ''}`;

    const projectUrl = project.url || '#contact';
    const target = projectUrl.startsWith('http') ? '_blank' : '_self';

    card.innerHTML = `
      <div class="work-card-top">
        ${project.featured ? '<span class="work-tag">Featured</span>' : ''}
        <span class="work-tag">${project.category}</span>
        <span class="work-tag">${project.year}</span>
      </div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="work-meta">
        <div class="work-tags">
          ${project.tags.map((tag) => `<span class="work-tag">${tag}</span>`).join('')}
        </div>
        <a href="${projectUrl}" target="${target}" rel="noopener noreferrer">View project</a>
      </div>
    `;

    projectsGrid.appendChild(card);
  });
}

function initWorkPage() {
  renderFilters();
  renderProjects();
}

document.addEventListener('DOMContentLoaded', initWorkPage);
