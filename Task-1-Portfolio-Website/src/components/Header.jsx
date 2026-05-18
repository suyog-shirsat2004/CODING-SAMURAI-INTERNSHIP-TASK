import React from 'react'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Portfolio</h1>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
