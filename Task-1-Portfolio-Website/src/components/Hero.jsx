import React from 'react'

function Hero({ name, title, location }) {
  return (
    <section className="section hero" id="home">
      <div className="container hero-content">
        <div className="hero-text">
          <p className="greeting">Hello, I'm</p>
          <h1 className="hero-name">{name}</h1>
          <p className="hero-title">{title}</p>
          <p className="hero-location">📍 {location}</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/image.jpg" alt={name} className="profile-img" />
        </div>
      </div>
    </section>
  )
}

export default Hero
