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
        <p className="footer-copy">
          Frontend Developer · Built with care · &copy; <span id="year"></span>{" "}
          Ravi Rajput
        </p>
      </div>
    </footer>
  );
}
