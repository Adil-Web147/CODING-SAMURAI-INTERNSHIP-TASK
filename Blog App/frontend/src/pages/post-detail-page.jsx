import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./post-detail-page.css";

export default function PostDetailPage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const { authFetch } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authFetch(`${API_BASE_URL}/api/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, authFetch]);

  const formatPostDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateReadTime = (content) => {
    if (!content) return "0 min read";
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="post-detail-container">
        <p className="loading-message">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-detail-container">
        <p className="error-message">Error: {error}</p>
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft className="back-icon" /> Back
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-container">
        <p className="not-found-message">Post not found.</p>
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft className="back-icon" /> Back
        </button>
      </div>
    );
  }

  const fullImageUrl = post.imageUrl
    ? `${import.meta.env.VITE_API_URL}${post.imageUrl}`
    : "/placeholder.svg?height=300&width=600";
  const fullAuthorAvatarSrc = post.user?.profilePictureUrl
    ? `${import.meta.env.VITE_API_URL}${post.user.profilePictureUrl}`
    : "/placeholder.svg";

  const contentParagraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="post-detail-container">
      <div className="post-detail-card">
        <Link to="/" className="back-to-home">
          <ArrowLeft className="back-icon" /> Back to Home
        </Link>

        <img
          src={fullImageUrl || "/placeholder.svg"}
          alt={post.title}
          className="post-detail-image"
        />

        <div className="post-detail-header">
          <div className="post-detail-categories">
            <span className="category-tag">{post.category}</span>
            {post.tags &&
              post.tags.map((tag, index) => (
                <span key={index} className="category-tag">
                  {tag}
                </span>
              ))}
          </div>
          <h1 className="post-detail-title">{post.title}</h1>
          <div className="post-detail-author-info">
            <img
              src={fullAuthorAvatarSrc || "/placeholder.svg"}
              alt={post.user?.username || "Author"}
              className="author-avatar"
            />
            <div className="author-meta">
              <p className="author-name">
                By {post.user?.username || "Unknown Author"}
              </p>
              <span className="post-date">
                {formatPostDate(post.createdAt)} •{" "}
                {calculateReadTime(post.content)}
              </span>
            </div>
          </div>
        </div>

        <div className="post-detail-content">
          {contentParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
