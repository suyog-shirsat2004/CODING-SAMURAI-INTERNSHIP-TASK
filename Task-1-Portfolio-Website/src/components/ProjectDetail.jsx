import React from 'react'

function ProjectDetail({ project, onClose }) {
  if (!project) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{project.title}</h2>
        <p className="modal-description">{project.description}</p>
        <div className="modal-details">
          <div className="modal-section">
            <h4>Technologies</h4>
            <div className="tech-stack">
              {project.tech.map((t, i) => (
                <span key={i} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
          {project.highlights && (
            <div className="modal-section">
              <h4>Highlights</h4>
              <ul>
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <a
          href="https://github.com/suyog-shirsat2004/CODING-SAMURAI-INTERNSHIP-TASK"
          target="_blank"
          rel="noopener noreferrer"
          className="modal-link"
        >
          View on GitHub &rarr;
        </a>
      </div>
    </div>
  )
}

export default ProjectDetail
