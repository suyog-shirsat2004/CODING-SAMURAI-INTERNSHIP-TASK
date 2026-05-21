import React from 'react'

function Header() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>Portfolio</h1>
        <nav className="nav">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home') }}>Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about') }}>About</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects') }}>Projects</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
