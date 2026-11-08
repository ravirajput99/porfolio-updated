import { Code2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero section">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-kicker">Frontend Developer</p>
          <h1 className="hero-title">
            Building secure, high-performance{" "}
            <span className="highlight">web experiences</span>
          </h1>
          <p className="hero-subtitle">
            5+ years of experience with React.js, Next.js, and TypeScript.
            Currently building IPO, Funds, and eDIS flows for Breeze, a stock
            broking platform, and Nova AI — a locally hosted LLM code review
            bot for Bitbucket.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Work <Code2 size={18} />
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">30+</span>
              <span className="stat-label">Projects Built</span>
            </div>
            <div className="stat">
              <span className="stat-number">12</span>
              <span className="stat-label">Core Skills</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="avatar-box" aria-label="Profile avatar">
            RR
          </div>
          <div className="code-glow" />
        </div>
      </div>
    </section>
  );
}
