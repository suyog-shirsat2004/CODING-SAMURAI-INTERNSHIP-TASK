import React, { useState } from 'react'

function Contact({ email, phone, github, linkedin, twitter }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setFormData({ username: '', email: '', mobile: '' })
    setTimeout(() => setShowSuccess(false), 3000)
  }

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

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <button type="submit" className="btn btn-submit">Submit</button>
          </form>

          <div className="social-links">
            <a href={github} target="_blank" rel="noopener noreferrer" className="social-btn github">GitHub</a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-btn linkedin">LinkedIn</a>
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-btn twitter">Twitter</a>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="success-popup">
          <div className="popup-content">
            <span className="popup-icon">✓</span>
            <p>Message Sent Successfully!</p>
            <button className="close-btn" onClick={() => setShowSuccess(false)}>×</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Contact
