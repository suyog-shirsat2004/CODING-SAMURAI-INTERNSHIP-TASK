function Contact({ email, social }) {
  return (
    <section id="contact" className="section contact">
      <h2>Contact Me</h2>
      <div className="contact-info">
        <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
        <div className="social-links">
          <a href={social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
