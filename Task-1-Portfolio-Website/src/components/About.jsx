import React from 'react'

function About({ name, fullName, title, location, university, description, skills, hobbies }) {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-intro">
            <h3>Hello! I'm <span className="highlight">{fullName}</span></h3>
            <p className="title">{title} | {location}</p>
          </div>
          
          <div className="about-text">
            <p>{description}</p>
          </div>

          <div className="about-details">
            <div className="detail-card">
              <h4>Education</h4>
              <p>{university}</p>
              <p className="sub-text">Bachelor of Computer Science (BCS)</p>
            </div>
          </div>

          <div className="skills-section">
            <h3>Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="hobbies-section">
            <h3>Hobbies & Interests</h3>
            <div className="hobbies-grid">
              {hobbies.map((hobby, index) => (
                <span key={index} className="hobby-tag">{hobby}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
