import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About_me from "./components/About_me";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";

function App() {
  return (
    <div className="min-h-screen bg-darkBg text-lightText">
      <Navbar />
      <Hero />
      <About_me />
      <Timeline />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;