import { Facebook, Twitter, Github, Menu } from "lucide-react"
import "./footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <a href="#" className="footer-logo">
          <Menu className="footer-logo-icon" />
          <span>BlogApp</span>
        </a>
        <p className="footer-description">Built with Node.js, Express & MongoDB</p>
        <div className="footer-social-links">
          <a href="#" className="social-link">
            <Facebook className="social-icon" />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="social-link">
            <Twitter className="social-icon" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" className="social-link">
            <Github className="social-icon" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
