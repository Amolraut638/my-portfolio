import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const sections = ["hero", "about", "journey", "skills", "projects", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Journey", to: "journey" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-darkBg/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

            {/* Logo */}
            <Link to="hero" smooth duration={500}>
              <h1 className="text-xl md:text-2xl font-bold cursor-pointer">
                <span className="text-lightText">Amol</span>{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Raut
                </span>
              </h1>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  {...item}
                  isActive={activeSection === item.to}
                />
              ))}
              <Link to="contact" smooth duration={500}>
                <button className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-accent transition duration-300 shadow-glow text-sm">
                  Contact
                </button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl text-lightText z-[60] relative"
            >
              {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-darkBg border-l border-gray-800 z-[60] flex flex-col px-6 py-8 shadow-2xl"
            >
              {/* Drawer Logo */}
              <div className="mb-10">
                <h1 className="text-xl font-bold">
                  <span className="text-lightText">Amol</span>{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Raut
                  </span>
                </h1>
              </div>

              {/* Nav Items */}
              <div className="flex flex-col gap-1 flex-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={item.to}
                      smooth
                      duration={500}
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 cursor-pointer ${
                        activeSection === item.to
                          ? "bg-primary/10 text-primary"
                          : "text-mutedText hover:text-lightText hover:bg-gray-800/50"
                      }`}>
                        {/* Active dot */}
                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          activeSection === item.to ? "bg-primary" : "bg-gray-700"
                        }`} />
                        <span className="text-base font-medium">{item.name}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Contact button at bottom of drawer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link
                  to="contact"
                  smooth
                  duration={500}
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="w-full py-3 bg-primary text-white rounded-xl hover:bg-accent transition duration-300 font-semibold text-sm shadow-glow">
                    Contact Me
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* Desktop Nav Item with animated underline */
function NavItem({ name, to, isActive }) {
  return (
    <Link to={to} smooth duration={500}>
      <div className="relative cursor-pointer py-1 group">
        <span className={`text-sm font-medium transition duration-300 ${
          isActive ? "text-primary" : "text-mutedText hover:text-lightText"
        }`}>
          {name}
        </span>
        {/* Animated underline */}
        <motion.div
          className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-primary to-accent rounded-full"
          initial={false}
          animate={{ width: isActive ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </Link>
  );
}

export default Navbar;