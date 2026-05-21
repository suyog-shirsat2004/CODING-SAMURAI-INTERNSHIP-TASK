import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
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
        <Projects 
          projects={[
            {
              id: 1,
              title: "AI Art Gallery",
              description: "An interactive gallery showcasing AI-generated artwork with dynamic filtering and immersive 3D viewer.",
              tech: ["React", "Three.js", "TensorFlow"]
            },
            {
              id: 2,
              title: "Music Visualizer",
              description: "Real-time audio visualization that transforms music into mesmerizing animated graphics and patterns.",
              tech: ["React", "Web Audio API", "Canvas"]
            },
            {
              id: 3,
              title: "Space Explorer",
              description: "Interactive 3D solar system experience with real-time planetary data and astronaut tracking.",
              tech: ["React", "Three.js", "NASA API"]
            },
            {
              id: 4,
              title: "Code Playground",
              description: "Live code editor with instant preview supporting multiple languages and collaborative editing.",
              tech: ["React", "Monaco Editor", "WebSocket"]
            },
            {
              id: 5,
              title: "Fitness Tracker",
              description: "Personal fitness dashboard with workout analytics, progress charts, and AI-powered recommendations.",
              tech: ["React", "D3.js", "Node.js"]
            },
            {
              id: 6,
              title: "Recipe Generator",
              description: "Smart recipe app that creates meal plans based on dietary preferences and available ingredients.",
              tech: ["React", "AI API", "Firebase"]
            }
          ]}
        />
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
    </div>
  )
}

export default App
