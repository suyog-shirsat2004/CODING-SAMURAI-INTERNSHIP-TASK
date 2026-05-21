const cardColors = [
  { bg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)', tag: '#f48fb1', btn: '#c2185b' },
  { bg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', tag: '#64b5f6', btn: '#1565c0' },
  { bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', tag: '#81c784', btn: '#2e7d32' },
  { bg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)', tag: '#ffb74d', btn: '#e65100' },
  { bg: 'linear-gradient(135deg, #f3e5f5, #e1bee7)', tag: '#ce93d8', btn: '#6a1b9a' },
  { bg: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)', tag: '#4dd0e1', btn: '#006064' },
]

function Projects({ projects, onSelect }) {
  return (
    <section id="projects" className="section projects-section">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project, index) => {
          const c = cardColors[index % cardColors.length]
          return (
            <div key={index} className="project-card" style={{ background: c.bg }}>
              <div className="project-card-header">
                <span className="project-number">0{index + 1}</span>
                <h3>{project.title}</h3>
              </div>
              <p>{project.description}</p>
              <div className="tech">
                {project.tech.map((t) => (
                  <span key={t} style={{ background: c.tag, color: '#fff' }}>{t}</span>
                ))}
              </div>
              <button className="project-link" style={{ color: c.btn }} onClick={() => onSelect(project)}>
                View Project &rarr;
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Projects
