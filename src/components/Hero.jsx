import { Code2, Mail, Globe, Link } from "lucide-react";

const socialLinks = [
  { label: "GitHub", url: "https://github.com/ravirajput99" },
  { label: "LinkedIn", url: "https://linkedin.com/in/ravirajput" },
  { label: "X", url: "https://x.com/ravirajput" },
];

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-kicker">Hi, I'm Ravi Rajput</div>
          <h1 className="hero-title">
            Software Engineer <br />
            <span className="highlight">Building Digital Products</span>
          </h1>
          <p className="hero-subtitle">
            Frontend developer with 5+ years of experience building secure,
            high-performance web apps with React.js, Next.js, and TypeScript.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Work <Code2 size={16} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </div>
          <div className="hero-social">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="saturn-planet">
            <div className="planet-glow" />
            <div className="saturn-rings">
              <div className="ring ring-outer" />
              <div className="ring ring-inner" />
              <div className="ring ring-glow" />
            </div>
            <div className="planet-body" />
            <div className="planet-band band-1" />
            <div className="planet-band band-2" />
            <div className="planet-band band-3" />
            <div className="planet-highlight" />
            <div className="moon moon-1" />
            <div className="moon moon-2" />
            <div className="moon moon-3" />
          </div>
          <div className="code-glow" />
        </div>
      </div>
    </section>
  );
}
