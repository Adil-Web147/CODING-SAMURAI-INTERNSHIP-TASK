import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb, Users, PenTool, Sparkles } from "lucide-react";
import "./about-page.css";
export default function AboutPage() {
  const teamMembers = [
    {
      name: "Rehan Khan",
      role: "Computer Scientist & AI Specialist",
      avatar: "/Adil.jpg",
      bio: "Blockchain Full Stack Developer | Next.js & AI Enthusiast | Building secure, intelligent, and scalable web3 applications.",
    },
    {
      name: "Adil Khan",
      role: "Founder & Lead Developer",
      avatar: "/Asim.jpg",
      bio: "Full Stack Developer | React.js Expert | Passionate about building scalable, modern web apps",
    },
    {
      name: "Asim Khan",
      role: "Community Manager",
      avatar: "/Rehan.jpg",
      bio: "Digital Manager | Driving growth through digital strategy, content, and performance marketing",
    },
  ];

  return (
    <div className="about-page-container">
      <div className="about-page-card">
        <Link to="/" className="back-to-home">
          <ArrowLeft className="back-icon" /> Back to Home
        </Link>

        <h1 className="about-title">
          Discover Our <span className="about-title-highlight">Story</span>
        </h1>
        <p className="about-tagline">
          Connecting Minds, Sharing Knowledge, Inspiring Creativity.
        </p>

        <div className="about-section about-story">
          <h2 className="about-subtitle">Our Journey</h2>
          <p>
            **BlogApp** was born out of a simple idea: to create a platform
            where anyone can share their unique stories, insights, and expertise
            with the world. In a digital age overflowing with information, we
            wanted to build a space that prioritizes quality, authenticity, and
            community engagement.
          </p>
          <p>
            From humble beginnings, we've grown into a thriving hub for writers,
            thinkers, and readers from all walks of life. Our commitment remains
            unwavering: to provide an intuitive, powerful, and supportive
            environment for content creation and consumption.
          </p>
        </div>

        <div className="about-section about-features">
          <h2 className="about-subtitle">Why Choose BlogApp?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <Lightbulb className="feature-icon" />
              <h3>Insightful Content</h3>
              <p>
                Dive into a diverse range of topics, from tech to lifestyle,
                curated by passionate writers.
              </p>
            </div>
            <div className="feature-item">
              <Users className="feature-icon" />
              <h3>Vibrant Community</h3>
              <p>
                Connect with like-minded individuals, share ideas, and engage in
                meaningful discussions.
              </p>
            </div>
            <div className="feature-item">
              <PenTool className="feature-icon" />
              <h3>Seamless Publishing</h3>
              <p>
                Our intuitive editor makes writing and publishing your posts
                effortless and enjoyable.
              </p>
            </div>
            <div className="feature-item">
              <Sparkles className="feature-icon" />
              <h3>Inspire & Be Inspired</h3>
              <p>
                Find inspiration in others' work and inspire a global audience
                with your unique voice.
              </p>
            </div>
          </div>
        </div>

        <div className="about-section about-team">
          <h2 className="about-subtitle">Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="team-member-avatar"
                />
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <p className="team-member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section about-cta">
          <h2 className="about-subtitle">Ready to Share Your Voice?</h2>
          <p>
            Join thousands of writers and readers who are already part of the
            BlogApp community. Start your blogging journey today!
          </p>
          <Link to="/new-post" className="about-cta-button">
            Start Writing Now
          </Link>
        </div>

        <div className="about-contact">
          <p>
            Questions, suggestions, or just want to say hello? We'd love to hear
            from you!{" "}
            <a href="mailto:info@blogapp.com" className="about-contact-link">
              Contact Us
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
