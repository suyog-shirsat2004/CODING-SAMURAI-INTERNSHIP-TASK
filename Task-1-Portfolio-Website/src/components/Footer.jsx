import React from 'react'

function Footer({ github, linkedin, twitter, email }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <a href={`mailto:${email}`}>Email</a>
            <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} Suyog Shirsat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
