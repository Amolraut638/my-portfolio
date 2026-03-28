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
    <div className="min-h-screen text-lightText relative">
      {/* Background layer */}
      <div className="fixed inset-0 -z-10 bg-[#0B0F19]">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse bg-[#6366f1]/20" />
        <div
          style={{ animationDelay: "1s" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] animate-pulse bg-[#8b5cf6]/20"
        />
        <div
          style={{ animationDelay: "0.5s" }}
          className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-[100px] animate-pulse bg-[#6366f1]/15"
        />
      </div>
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