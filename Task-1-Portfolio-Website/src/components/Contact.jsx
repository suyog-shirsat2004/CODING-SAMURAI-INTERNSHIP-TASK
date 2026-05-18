import React from 'react'

function Contact({ email, phone, github, linkedin, twitter }) {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <span className="icon">📧</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="contact-item">
              <span className="icon">📱</span>
              <a href={`tel:${phone}`}>{phone}</a>
            </div>
          </div>
          <div className="social-links">
            <a href={github} target="_blank" rel="noopener noreferrer" className="social-btn github">GitHub</a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-btn linkedin">LinkedIn</a>
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-btn twitter">Twitter</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
