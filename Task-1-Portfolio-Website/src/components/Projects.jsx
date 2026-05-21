import React from 'react'

const cardStyles = [
  { bg: 'linear-gradient(135deg, #e8d5f5, #f3e8ff)' },
  { bg: 'linear-gradient(135deg, #fce4ec, #ffe0e6)' },
  { bg: 'linear-gradient(135deg, #dbeafe, #e0f2fe)' },
  { bg: 'linear-gradient(135deg, #d1fae5, #dcfce7)' },
  { bg: 'linear-gradient(135deg, #fef3c7, #fef9c3)' },
  { bg: 'linear-gradient(135deg, #f3e8ff, #ede9fe)' },
]

function ProjectCard({ title, description, tech, style, onClick }) {
  return (
    <div className="project-card" style={{ background: style.bg, color: '#333' }} onClick={onClick}>
      <h3 style={{ color: '#1a1a2e' }}>{title}</h3>
      <p style={{ color: '#555' }}>{description}</p>
      <div className="tech-stack">
        {tech.map((item, index) => (
          <span key={index} className="tech-tag">{item}</span>
        ))}
      </div>
      <span className="project-view-btn">View Details &rarr;</span>
    </div>
  )
}

function Projects({ projects, onSelect }) {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tech={project.tech}
              style={cardStyles[index % cardStyles.length]}
              onClick={() => onSelect(project)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
