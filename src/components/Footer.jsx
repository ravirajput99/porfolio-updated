import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }, []);

  return (
    <footer className="footer" aria-label="Footer">
      <div className="footer-inner">
        <div className="footer-brand">Ravi Rajput.</div>
        <div className="footer-links">
          <a href="https://ravi-rajput.vercel.app/" target="_blank" rel="noopener noreferrer">Live Site</a>
          <a href="https://github.com/ravirajput99/porfolio-updated" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p className="footer-copy">
          Frontend Developer · Built with care · &copy; <span id="year"></span>{" "}
          Ravi Rajput
        </p>
      </div>
    </footer>
  );
}
