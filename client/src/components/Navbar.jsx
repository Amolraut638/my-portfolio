import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { name: "Home", to: "hero", type: "scroll" },
    { name: "About", to: "about", type: "scroll" },
    { name: "Journey", to: "journey", type: "scroll" },
    { name: "Skills", to: "skills", type: "scroll" },
    { name: "Projects", to: "projects", type: "scroll" },
    { name: "Blogs", to: "/blogs", type: "link", isNew: true },
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

      {/* Drawer */}
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

            {/* Drawer Panel */}
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
                    <MobileNavItem
                      {...item}
                      isActive={activeSection === item.to}
                      onClick={() => setMenuOpen(false)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Contact Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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

/* Desktop Nav Item */
function NavItem({ name, to, isActive, type, isNew }) {
  const content = (
    <div className="relative cursor-pointer py-1 group flex items-center gap-1.5">
      <span className={`text-sm font-medium transition duration-300 ${
        isActive ? "text-primary" : "text-mutedText hover:text-lightText"
      }`}>
        {name}
      </span>

      {/* NEW badge */}
      {isNew && (
        <span className="relative flex items-center">
          <span className="text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-primary to-accent text-white px-1.5 py-0.5 rounded-full leading-none">
            New
          </span>
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
        </span>
      )}

      {/* Animated underline */}
      <motion.div
        className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-primary to-accent rounded-full"
        initial={false}
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );

  if (type === "link") {
    return <RouterLink to={to}>{content}</RouterLink>;
  }

  return (
    <Link to={to} smooth duration={500}>
      {content}
    </Link>
  );
}

/* Mobile Drawer Nav Item */
function MobileNavItem({ name, to, type, isNew, isActive, onClick }) {
  const content = (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 cursor-pointer ${
      isActive
        ? "bg-primary/10 text-primary"
        : "text-mutedText hover:text-lightText hover:bg-gray-800/50"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
        isActive ? "bg-primary" : "bg-gray-700"
      }`} />
      <span className="text-base font-medium flex items-center gap-2">
        {name}
        {isNew && (
          <span className="relative flex items-center gap-1">
            <span className="text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-primary to-accent text-white px-1.5 py-0.5 rounded-full leading-none">
              New
            </span>
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
          </span>
        )}
      </span>
    </div>
  );

  if (type === "link") {
    return <RouterLink to={to} onClick={onClick}>{content}</RouterLink>;
  }

  return (
    <Link to={to} smooth duration={500} onClick={onClick}>
      {content}
    </Link>
  );
}

export default Navbar;