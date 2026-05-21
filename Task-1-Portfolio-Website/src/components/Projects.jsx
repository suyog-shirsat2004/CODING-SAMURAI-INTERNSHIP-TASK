import React from 'react'

const cardStyles = [
  { bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { bg: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { bg: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
]

function ProjectCard({ title, description, tech, style }) {
  return (
    <div className="project-card" style={{ background: style.bg }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tech-stack">
        {tech.map((item, index) => (
          <span key={index} className="tech-tag">{item}</span>
        ))}
      </div>
    </div>
  )
}

function Projects({ projects }) {
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
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
