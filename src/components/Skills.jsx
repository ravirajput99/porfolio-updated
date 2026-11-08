export default function Skills() {
  const categories = [
    {
      title: "Core",
      items: [
        "JavaScript (ES6+)",
        "TypeScript",
        "React.js",
        "Next.js",
        "Redux",
        "Node.js",
        "Express",
        "HTML5/CSS3",
        "Java",
        "Python",
      ],
    },
    {
      title: "UI & Data",
      items: [
        "Material UI",
        "Ant Design",
        "AG Grid",
        "Formik",
        "Strapi (Headless CMS)",
        "REST APIs",
        "Responsive Web Design",
      ],
    },
    {
      title: "Security & Performance",
      items: [
        "Session management",
        "SSO authentication",
        "Cross-tab sync",
        "Token expiry handling",
        "Server-side rendering",
        "Lazy loading",
        "Memoization",
        "Re-render optimization",
      ],
    },
    {
      title: "Testing & Tools",
      items: [
        "Playwright (E2E)",
        "Unit testing",
        "Code reviews",
        "Git",
        "Webpack",
        "Jenkins",
        "JIRA",
        "Agile",
      ],
    },
    {
      title: "AI & Backend",
      items: [
        "Ollama (Local LLMs)",
        "Prompt design",
        "LLM-assisted code review",
        "AI-assisted development",
        "Webhook automation",
        "OAuth 2.0",
        "HMAC-SHA256",
      ],
    },
    {
      title: "Familiar With",
      items: ["GraphQL", "React Router (SSR)", "Search & analytics", "A/B experimentation"],
    },
  ];

  return (
    <section className="section section-bg" id="skills" aria-label="Skills section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills</h2>
          <p className="section-intro">Tools and technologies I work with daily.</p>
        </div>
        <div className="skills-grid">
          {categories.map((cat) => (
            <div className="skill-category glass-card" key={cat.title}>
              <h3 className="skill-category-title">{cat.title}</h3>
              <ul className="skill-list">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
