import { useState, useEffect } from "react";
import HeroSection from "../components/hero-section";
import PostCard from "../components/post-card";
import { ChevronDown } from "lucide-react";
import "./home-page.css";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authFetch } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authFetch(`${API_BASE_URL}/api/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching posts:", err);

        setPosts([
          {
            _id: "dummy1",
            imageSrc: "/placeholder.svg?height=300&width=600",
            user: {
              username: "John Developer",
              authorAvatarSrc: "/placeholder.svg",
            },
            category: "Technology",
            title: "Building a Blog with Node.js and Express",
            content:
              "Learn how to create a full-stack blogging application using Node.js, Express, and MongoDB. This comprehensive guide covers everything from setup to deployment.",
          },
          {
            _id: "dummy2",
            imageSrc: "/placeholder.svg?height=300&width=600",
            user: {
              username: "Sarah Database",
              authorAvatarSrc: "/placeholder.svg",
            },
            category: "Database",
            title: "MongoDB CRUD Operations Explained",
            content:
              "Master the fundamentals of MongoDB CRUD operations. This tutorial covers Create, Read, Update, and Delete operations with practical examples.",
          },
          {
            _id: "dummy3",
            imageSrc: "/placeholder.svg?height=300&width=600",
            user: {
              username: "Mike Frontend",
              authorAvatarSrc: "/placeholder.svg",
            },
            category: "Frontend",
            title: "Creating Beautiful UIs with Tailwind CSS",
            content:
              "Discover how to build stunning user interfaces using Tailwind CSS. Learn about utility-first design and responsive layouts.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [authFetch]);

  if (loading) {
    return (
      <>
        <HeroSection />
        <section className="latest-posts-section">
          <div className="latest-posts-header">
            <h2 className="latest-posts-title">Latest Posts</h2>
          </div>
          <div className="posts-grid">
            <p>Loading posts...</p>
          </div>
        </section>
      </>
    );
  }

  if (error && posts.length === 0) {
    return (
      <>
        <HeroSection />
        <section className="latest-posts-section">
          <div className="latest-posts-header">
            <h2 className="latest-posts-title">Latest Posts</h2>
          </div>
          <div className="posts-grid">
            <p style={{ color: "red" }}>Error: {error}</p>
            <p>Displaying dummy data instead.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <section className="latest-posts-section">
        <div className="latest-posts-header">
          <h2 className="latest-posts-title">Latest Posts</h2>
          <div className="dropdown-wrapper">
            <button className="dropdown-trigger" onClick={toggleDropdown}>
              Latest
              <ChevronDown className="dropdown-icon" />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-item">Latest</div>
                <div className="dropdown-item">Popular</div>
                <div className="dropdown-item">Oldest</div>
              </div>
            )}
          </div>
        </div>
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              _id={post._id}
              imageSrc={post.imageUrl}
              authorAvatarSrc={post.user?.profilePictureUrl}
              authorName={post.user?.username}
              category={post.category}
              title={post.title}
              description={post.content}
              views={post.views}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
      </section>
    </>
  );
}
