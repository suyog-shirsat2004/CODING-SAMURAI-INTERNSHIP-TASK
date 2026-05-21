import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import ProjectDetail from './components/ProjectDetail'
import Contact from './components/Contact'
import Footer from './components/Footer'

const projects = [
  {
    id: 1,
    title: 'AI Art Gallery',
    description: 'An interactive gallery showcasing AI-generated artwork with dynamic filtering and immersive 3D viewer.',
    tech: ['React', 'Three.js', 'TensorFlow'],
    highlights: [
      'AI-generated artwork with style transfer',
      'Immersive 3D gallery viewer',
      'Dynamic filtering and search',
    ],
  },
  {
    id: 2,
    title: 'Music Visualizer',
    description: 'Real-time audio visualization that transforms music into mesmerizing animated graphics and patterns.',
    tech: ['React', 'Web Audio API', 'Canvas'],
    highlights: [
      'Real-time audio frequency analysis',
      'Multiple visualization modes',
      'Responsive animated graphics',
    ],
  },
  {
    id: 3,
    title: 'Space Explorer',
    description: 'Interactive 3D solar system experience with real-time planetary data and astronaut tracking.',
    tech: ['React', 'Three.js', 'NASA API'],
    highlights: [
      'Real-time planetary orbit simulation',
      'Live NASA data integration',
      'Interactive 3D space navigation',
    ],
  },
  {
    id: 4,
    title: 'Code Playground',
    description: 'Live code editor with instant preview supporting multiple languages and collaborative editing.',
    tech: ['React', 'Monaco Editor', 'WebSocket'],
    highlights: [
      'Multi-language code editing',
      'Real-time collaborative editing',
      'Instant live preview',
    ],
  },
  {
    id: 5,
    title: 'Fitness Tracker',
    description: 'Personal fitness dashboard with workout analytics, progress charts, and AI-powered recommendations.',
    tech: ['React', 'D3.js', 'Node.js'],
    highlights: [
      'Interactive workout analytics charts',
      'AI-powered fitness recommendations',
      'Progress tracking with visualizations',
    ],
  },
  {
    id: 6,
    title: 'Recipe Generator',
    description: 'Smart recipe app that creates meal plans based on dietary preferences and available ingredients.',
    tech: ['React', 'AI API', 'Firebase'],
    highlights: [
      'AI-powered recipe generation',
      'Dietary preference filtering',
      'Real-time ingredient matching',
    ],
  },
]

function App() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="app">
      <Header />
      <main>
        <Hero 
          name="Suyog Shirsat"
          title="Full Stack Developer"
          location="Nashik, Maharashtra"
        />
        <About 
          name="Suyog Shirsat"
          fullName="Suyog Madhav Shirsat"
          title="Full Stack Developer"
          location="Nashik, Maharashtra"
          university="Savitribai Phule Pune University"
          description="I am a passionate and motivated Computer Science student pursuing my Bachelor of Computer Science (BCS) degree. I am deeply interested in Full Stack Web Development, Artificial Intelligence, Machine Learning, Cybersecurity, and modern software technologies. I enjoy creating responsive, user-friendly, and interactive web applications that solve real-world problems and improve user experience. I have knowledge of frontend technologies such as HTML, CSS, JavaScript, ReactJS, and Bootstrap, along with backend and programming languages including Python, C++, Java, and Node.js. I also have experience working with DBMS, RDBMS, GitHub, and software development tools. Throughout my academic journey, I have worked on projects related to AI-driven security systems, agriculture management systems, and web development applications. These projects helped me improve my problem-solving abilities, logical thinking, teamwork, and project management skills. I am always eager to learn new technologies, improve my development skills, and gain real-world industry experience. My goal is to become a skilled Full Stack Developer and contribute to innovative and impactful technology solutions."
          skills={[
            "ReactJS", "JavaScript", "HTML & CSS", "Python", 
            "C++", "Node.js", "DBMS & RDBMS", "Git & GitHub", 
            "Artificial Intelligence", "Machine Learning"
          ]}
          hobbies={[
            "Learning New Technologies", "Web Development", 
            "AI & Cybersecurity", "Coding and Problem Solving", 
            "Exploring Tech Innovations"
          ]}
        />
        <Projects projects={projects} onSelect={setSelectedProject} />
        <Contact 
          email="suyogshirsat2004@gmail.com"
          phone="+91 7719984503"
          github="https://github.com/suyog-shirsat2004/CODING-SAMURAI-INTERNSHIP-TASK"
          linkedin="https://www.linkedin.com/in/suyog-shirsat-75a64622a/"
          twitter="https://twitter.com/suyogshirsat2004"
        />
      </main>
      <Footer 
        github="https://github.com/suyog-shirsat2004/CODING-SAMURAI-INTERNSHIP-TASK"
        linkedin="https://www.linkedin.com/in/suyog-shirsat-75a64622a/"
        twitter="https://twitter.com/suyogshirsat2004"
        email="suyogshirsat2004@gmail.com"
      />
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

export default App
