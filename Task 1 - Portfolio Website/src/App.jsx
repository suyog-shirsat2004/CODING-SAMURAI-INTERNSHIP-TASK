import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import ProjectDetail from './components/ProjectDetail'
import Contact from './components/Contact'
import Footer from './components/Footer'

const personalInfo = {
  name: 'Suyog Shirsat',
  role: 'Frontend Developer | MERN Stack Learner | ReactJS Developer',
  bio: 'Passionate web developer with a keen interest in building modern, responsive web applications. Currently exploring React and modern frontend technologies.',
  skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Node.js'],
  email: 'suyogshirsat2004@gmail.com',
  social: {
    github: 'https://github.com/suyog-shirsat2004/CODING-SAMURAI-INTERNSHIP-TASK',
    linkedin: 'https://www.linkedin.com/in/suyog-shirsat-75a64622a/',
  },
}

const projects = [
  {
    title: 'Portfolio Vault',
    description: 'An interactive personal brand showcase with dynamic project galleries, skill visualizations, and a fully responsive design system.',
    tech: ['React', 'Framer Motion', 'Styled Components'],
    highlights: [
      'Fully responsive design system with dark/light mode',
      'Animated page transitions and scroll-triggered reveals',
      'Optimized asset delivery with lazy loading',
    ],
    link: 'https://github.com/suyog-shirsat2004/CODING-SAMURAI-INTERNSHIP-TASK',
  },
  {
    title: 'ShopSphere',
    description: 'A full-featured e-commerce platform with real-time inventory management, secure checkout, and an AI-powered recommendation engine.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    highlights: [
      'Real-time inventory tracking across multiple warehouses',
      'AI-powered product recommendations based on browsing history',
      'Secure payment processing with Stripe integration',
    ],
    link: 'https://github.com/suyog-shirsat2004/CODING-SAMURAI-INTERNSHIP-TASK',
  },
  {
    title: 'WeatherVane',
    description: 'A premium meteorological dashboard with real-time satellite data, 7-day forecasting, and interactive heat maps.',
    tech: ['React', 'D3.js', 'OpenWeather API', 'Chart.js'],
    highlights: [
      'Real-time weather data with auto-refresh every 5 minutes',
      'Interactive heat maps and D3.js data visualizations',
      '7-day forecast with hourly breakdowns and severe weather alerts',
    ],
    link: 'https://github.com/suyog-shirsat2004/CODING-SAMURAI-INTERNSHIP-TASK',
  },
  {
    title: 'TaskForge',
    description: 'A collaborative project management suite with real-time editing, Kanban boards, Gantt charts, and team analytics.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    highlights: [
      'Real-time collaborative editing with live cursors',
      'Drag-and-drop Kanban boards with custom workflows',
      'Team performance analytics and productivity insights',
    ],
    link: 'https://github.com/suyog-shirsat2004/CODING-SAMURAI-INTERNSHIP-TASK',
  },
  {
    title: 'ChatSync',
    description: 'A real-time messaging application with end-to-end encryption, file sharing, video calls, and bot automation.',
    tech: ['React', 'Socket.io', 'WebRTC', 'Express'],
    highlights: [
      'End-to-end encrypted messaging with zero-knowledge architecture',
      'Peer-to-peer video calls powered by WebRTC',
      'Custom bot framework with automated workflow triggers',
    ],
    link: 'https://github.com/suyog-shirsat2004/CODING-SAMURAI-INTERNSHIP-TASK',
  },
  {
    title: 'FitTrack Pro',
    description: 'A comprehensive health and fitness tracker with AI-powered workout plans, nutrition logging, and progress analytics.',
    tech: ['React Native', 'TensorFlow', 'HealthKit'],
    highlights: [
      'AI-generated personalized workout plans using TensorFlow',
      'Nutrition tracking with barcode scanning and meal recognition',
      'Cross-platform mobile experience with HealthKit integration',
    ],
    link: 'https://github.com/suyog-shirsat2004/CODING-SAMURAI-INTERNSHIP-TASK',
  },
]

function App() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="app">
      <Header name={personalInfo.name} social={personalInfo.social} />
      <Hero name={personalInfo.name} role={personalInfo.role} />
      <About bio={personalInfo.bio} skills={personalInfo.skills} />
      <Projects projects={projects} onSelect={setSelectedProject} />
      <Contact email={personalInfo.email} social={personalInfo.social} />
      <Footer name={personalInfo.name} />
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
