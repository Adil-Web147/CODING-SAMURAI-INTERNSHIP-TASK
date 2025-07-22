import { Pencil, Search } from "lucide-react"
import "./hero-section.css"

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">
          Share Your <span className="hero-title-highlight">Stories</span>
        </h1>
        <p className="hero-description">
          A simple and elegant blogging platform built with Node.js, Express, and MongoDB. Create, read, and manage your
          blog posts effortlessly.
        </p>
        <div className="hero-buttons">
          <button className="hero-button primary">
            <Pencil className="hero-button-icon" />
            Start Writing
          </button>
          <button className="hero-button secondary">
            <Search className="hero-button-icon" />
            Browse Posts
          </button>
        </div>
      </div>
    </section>
  )
}
