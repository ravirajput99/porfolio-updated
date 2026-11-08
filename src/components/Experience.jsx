const experiences = [
  {
    badge: "Current",
    company: "Synapsewave Technology Pvt. Ltd.",
    role: "Software Engineer",
    meta: "Jan 2025 – Present · Mumbai (Remote)",
    desc:
      "Continued on Breeze after it moved from 63 Moons Technologies to Synapsewave.",
    highlights: [
      "Built the IPO and Funds modules for Breeze, a stock broking platform for businesses, plus the eDIS authorization flow for selling holdings.",
      "Designed an inactivity auto-lock and session timeout, with cross-tab sync via localStorage so locking one tab locks every open tab.",
      "Built a custom toast notification system in React, optimized to avoid unnecessary re-renders.",
      "Integrated AG Grid and SSO authentication, and wrote Playwright E2E tests for critical flows.",
      "Fixed live production tickets quickly in a time-sensitive trading environment.",
    ],
  },
  {
    badge: "2024 – 2025",
    company: "63 Moons Technologies",
    role: "Software Engineer",
    meta: "Oct 2024 – Jan 2025 · Bangalore (Remote)",
    desc:
      "Built and maintained frontend features for Breeze, a stock broking platform for businesses, until the product transferred to Synapsewave.",
    highlights: [],
  },
  {
    badge: "2023 – 2024",
    company: "RahalTech",
    role: "Frontend Developer",
    meta: "Dec 2023 – May 2024 · Remote",
    desc: "",
    highlights: [
      "Led frontend development for the launch of RahalTech&apos;s first website: responsive, SEO-friendly UIs in React.js and Next.js.",
      "Integrated RESTful APIs with backend developers. Tech: React.js, Next.js, Node.js, HTML5, CSS3",
    ],
  },
  {
    badge: "2021 – 2023",
    company: "Reevoy",
    role: "Software Engineer",
    meta: "Nov 2021 – Nov 2023 · Mumbai, India",
    desc: "",
    highlights: [
      "Core frontend team member who built the product from scratch, including a risk management tool for invoice factoring and user profiles with comments.",
      "Improved performance with component optimization and lazy loading; ran code reviews; built the company&apos;s static website with Strapi (headless CMS).",
      "Tech: React, Redux, Next.js, Material UI, Ant Design, Formik, REST APIs, Python, LangChain",
    ],
  },
  {
    badge: "2021",
    company: "Cognizant",
    role: "Programmer Analyst Trainee",
    meta: "May 2021 – Nov 2021 · Pune, India",
    desc: "",
    highlights: [
      "Built Java solutions (JDBC, JSP) and turned UI/UX mockups into interactive interfaces; worked with senior developers across the full development lifecycle.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience" aria-label="Experience section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <p className="section-intro">My professional journey so far.</p>
        </div>
        <div className="timeline" aria-label="Experience timeline">
          {experiences.map((exp) => (
            <article key={exp.company} className="timeline-item glass-card">
              <div className="timeline-content">
                <h3 className="timeline-company">{exp.company}</h3>
                <p className="timeline-role">{exp.role}</p>
                <p className="timeline-meta">{exp.meta}</p>
                {exp.desc && <p className="timeline-desc">{exp.desc}</p>}
                {exp.highlights.length > 0 ? (
                  <ul className="timeline-highlights">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
