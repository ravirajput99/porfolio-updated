export default function About() {
  return (
    <section className="section" id="about" aria-label="About section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-intro">
            Frontend Developer based in India, specializing in secure,
            high-performance web applications.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I&apos;m a Frontend Developer with <strong>5+ years of
              experience</strong> building secure, high-performance web apps
              with <strong>React.js, Next.js, and TypeScript</strong>. I enjoy
              turning complex problems into clean, maintainable code and
              user-friendly interfaces.
            </p>
            <p>
              Currently, I&apos;m building IPO, Funds, and eDIS flows plus
              session security for <strong>Breeze</strong>, a stock broking
              platform for businesses. I also built{" "}
              <strong>Nova AI</strong>, a locally hosted LLM code review bot
              for Bitbucket that reviews pull requests in under a minute using
              a local 7B model.
            </p>
            <p>
              Outside of work, I tinker with local LLMs, AI-assisted
              development, and webhook automation. I believe in writing code
              that&apos;s secure by default, performant by design, and easy for
              others to maintain.
            </p>
            <div className="about-quick-facts">
              <div className="fact">
                <span className="fact-label">Location</span>
                <span className="fact-value">
                  Gwalior, Madhya Pradesh, India
                </span>
              </div>
              <div className="fact">
                <span className="fact-label">Education</span>
                <span className="fact-value">
                  B.Tech Computer Science, 8.64/10 CGPA
                </span>
              </div>
              <div className="fact">
                <span className="fact-label">Availability</span>
                <span className="fact-value">Open to opportunities</span>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="about-card glass-card">
              <h3>What I do</h3>
              <ul className="feature-list">
                <li>Secure, high-performance frontend architecture</li>
                <li>
                  Session management, SSO, and token expiry handling
                </li>
                <li>React, Next.js, TypeScript &amp; Redux</li>
                <li>E2E testing with Playwright</li>
                <li>AI-assisted development &amp; local LLMs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
