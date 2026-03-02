import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-scroll";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const sections = ["hero", "about", "skills", "projects", "contact"];

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

  const navItems = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-darkBg/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8">
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
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                {...item}
                isActive={activeSection === item.to}
              />
            ))}

            <Link to="contact" smooth duration={500}>
              <button className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-accent transition duration-300 shadow-glow">
                Contact
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-lightText"
          >
            {menuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-darkBg transition-all duration-300 ${
          menuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navItems.map((item) => (
            <MobileNavItem
              key={item.to}
              {...item}
              onClick={() => setMenuOpen(false)}
            />
          ))}

          <Link to="contact" smooth duration={500} onClick={() => setMenuOpen(false)}>
            <button className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-accent transition duration-300">
              Contact
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

/* Desktop Nav Item */
function NavItem({ name, to, isActive }) {
  return (
    <Link to={to} smooth duration={500}>
      <span
        className={`cursor-pointer text-sm font-medium transition duration-300 ${
          isActive
            ? "text-primary"
            : "text-mutedText hover:text-lightText"
        }`}
      >
        {name}
      </span>
    </Link>
  );
}

/* Mobile Nav Item */
function MobileNavItem({ name, to, onClick }) {
  return (
    <Link to={to} smooth duration={500} onClick={onClick}>
      <span className="text-mutedText hover:text-primary transition text-lg">
        {name}
      </span>
    </Link>
  );
}

export default Navbar;