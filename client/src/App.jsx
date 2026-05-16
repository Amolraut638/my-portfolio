import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About_me from "./components/About_me";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import AdminLogin from "./pages/AdminLogin";
import BlogEditor from "./pages/BlogEditor";
import NewFeatureBadge from "./components/NewFeatureBadge";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About_me />
      <Timeline />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-darkBg text-lightText">
      <NewFeatureBadge />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/editor" element={<BlogEditor />} />
        <Route path="/admin/editor/:id" element={<BlogEditor />} />
      </Routes>
    </div>
  );
}

export default App;