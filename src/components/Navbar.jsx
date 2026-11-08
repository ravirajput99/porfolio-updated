import { useState } from "react";
import { Github, Linkedin, X, Mail, Phone, MapPin } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="nav-container">
        <a href="#" className="logo" aria-label="Ravi Rajput homepage">
          RR.
        </a>

        <button
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <span className={`hamburger-bar ${isOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${isOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${isOpen ? "open" : ""}`} />
        </button>

        <ul className={`nav-menu ${isOpen ? "open" : ""}`} id="nav-menu">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/assets/files/Ravi_Rajput_Resume.pdf"
              download
              className="nav-resume"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
