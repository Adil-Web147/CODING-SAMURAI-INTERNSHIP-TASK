import "./post-card.css";
import { Link } from "react-router-dom";

export default function PostCard({
  imageSrc,
  authorAvatarSrc,
  authorName,
  category,
  title,
  description,
  _id,
}) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const fullImageUrl = imageSrc
    ? `${API_BASE_URL}${imageSrc}`
    : "/placeholder.svg?height=300&width=600";
  const fullAuthorAvatarSrc = authorAvatarSrc
    ? `${API_BASE_URL}${authorAvatarSrc}`
    : "/placeholder.svg";

  return (
    <div className="post-card">
      <img
        src={fullImageUrl || "/placeholder.svg"}
        width={600}
        height={300}
        alt="Post image"
        className="post-card-image"
      />
      <div className="post-card-content">
        <div className="post-card-author-info">
          <img
            src={fullAuthorAvatarSrc || "/placeholder.svg"}
            alt={authorName || "Author"}
            className="post-card-avatar"
          />
          <div>
            <p className="post-card-author-name">
              {authorName || "Unknown Author"}
            </p>
            <span className="post-card-category">{category}</span>
          </div>
        </div>
        <h2 className="post-card-title">{title}</h2>
        <p className="post-card-description">{description}</p>
        <div className="post-card-meta">
          <Link to={`/posts/${_id}`} className="post-card-read-more">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
