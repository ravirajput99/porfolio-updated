import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, X } from "lucide-react";

const socialLinks = [
  { label: "GitHub", url: "https://github.com/ravirajput99", Icon: Github },
  { label: "LinkedIn", url: "https://linkedin.com/in/ravirajput", Icon: Linkedin },
  { label: "X (Twitter)", url: "https://x.com/ravirajput", Icon: X },
];

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setStatus("Sending…");

    // Simulate sending (replace with a real endpoint when ready)
    setTimeout(() => {
      setStatus(
        "Thanks! Your message has been sent. I'll get back to you soon."
      );
      e.currentTarget.reset();
      console.log("Form data submitted:", data);
    }, 1200);
  };

  return (
    <section className="section" id="contact" aria-label="Contact section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Let&apos;s Work Together</h2>
          <p className="section-intro">
            Open to new opportunities and collaborations.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card glass-card">
              <h3>Say Hello</h3>
              <p>
                I&apos;m currently open to frontend and full-stack
                opportunities. Feel free to reach out for a chat or
                collaboration.
              </p>
              <ul className="contact-details">
                <li>
                  <span className="contact-label">Email</span>
                  <a href="mailto:s.ravirajput99@gmail.com">
                    <Mail size={16} className="contact-icon" />
                    s.ravirajput99@gmail.com
                  </a>
                </li>
                <li>
                  <span className="contact-label">Phone</span>
                  <a href="tel:+917415589664">
                    <Phone size={16} className="contact-icon" />
                    +91 74155 89664
                  </a>
                </li>
                <li>
                  <span className="contact-label">Location</span>
                  <MapPin size={16} className="contact-icon" />
                  <span>Gwalior, Madhya Pradesh, India</span>
                </li>
              </ul>
            </div>
            <div className="contact-card glass-card">
              <h3>Find Me Online</h3>
              <ul className="social-links">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <link.Icon size={18} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="contact-form-wrap">
            <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Tell me about your project…"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Send Message
              </button>
            </form>
            <div className="form-status" id="form-status" aria-live="polite">
              {status}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
