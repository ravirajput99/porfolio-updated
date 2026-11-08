const projects = [
  {
    title: "Nova AI — Bitbucket Code Review Bot",
    tag: "AI · Code Review",
    desc:
      "A locally hosted LLM code review bot for Bitbucket that reviews pull requests with line-level inline comments and a risk-scored (0–100) summary. Detects hardcoded credentials, SQL injection, and eval(), with suggested auto-fixes.",
    tech: ["Node.js", "Express", "Ollama (qwen2.5-coder)", "Bitbucket API", "OAuth 2.0", "HMAC-SHA256"],
    links: [
      { label: "Live Demo", url: "https://bitbucket.org/nova-ai/nova-ai/pull-requests/" },
      { label: "Bitbucket", url: "https://bitbucket.org/nova-ai/nova-ai/src/main/" },
    ],
  },
  {
    title: "Breeze — Stock Broking Platform",
    tag: "Finance · Trading",
    desc:
      "Built the IPO, Funds, and eDIS modules for Breeze, a stock broking platform for businesses. Includes session security, inactivity auto-lock, cross-tab sync, AG Grid integration, and SSO authentication.",
    tech: ["React.js", "Next.js", "TypeScript", "AG Grid", "SSO", "Playwright"],
    links: [
      { label: "Live Demo", url: "https://breezebot1.odinwave.com/" },
    ],
  },
  {
    title: "RahalTech — Company Website",
    tag: "Web · SEO",
    desc:
      "Led frontend development for RahalTech&apos;s first website — a responsive, SEO-friendly UI built with React.js and Next.js, with RESTful API integration.",
    tech: ["React.js", "Next.js", "Node.js", "HTML5", "CSS3", "REST APIs"],
    links: [
      { label: "Live Site", url: "https://rahal-tech.com/" },
    ],
  },
];

export default function Projects() {
  return (
    <section className="section section-bg" id="projects" aria-label="Projects section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-intro">A selection of work I&apos;m proud of.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.title} className="project-card glass-card">
              <div className="project-image">
                <div className="project-image-placeholder" aria-label={`${project.title} preview`} />
                <span className="project-tag">{project.tag}</span>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.url}
                      className="project-link"
                      target={l.url === "#" ? undefined : "_blank"}
                      rel={l.url === "#" ? undefined : "noopener noreferrer"}
                    >
                      {l.label} <span>→</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
