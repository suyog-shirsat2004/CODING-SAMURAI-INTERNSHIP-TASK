function About({ bio, skills }) {
  return (
    <section id="about" className="section about">
      <h2>About Me</h2>
      <p>{bio}</p>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#0f766e' }}>
        Skills
      </h3>
      <ul className="skills">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  )
}

export default About
