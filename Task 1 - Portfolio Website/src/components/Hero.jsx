import { useState, useEffect } from 'react'

const roles = ['Frontend Developer', 'MERN Stack Learner', 'ReactJS Developer']

function Hero({ name, role }) {
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[index]
    let timer

    if (!deleting && display.length < current.length) {
      timer = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 80)
    } else if (!deleting && display.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && display.length > 0) {
      timer = setTimeout(() => setDisplay(display.slice(0, -1)), 40)
    } else if (deleting && display.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % roles.length)
    }

    return () => clearTimeout(timer)
  }, [display, deleting, index])

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-profile">
          <img src="/image.jpg" alt={name} className="profile-pic" />
          <div className="profile-ring"></div>
        </div>
        <p className="hero-greeting">Hello, I'm</p>
        <h2>{name}</h2>
        <p className="hero-role">
          {display}<span className="cursor">|</span>
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-secondary">Get in Touch</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
