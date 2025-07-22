import { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Code,
  UploadCloud,
  Save,
  Upload,
} from "lucide-react";
import "./post-form.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const { user, loading: authLoading, authFetch } = useAuth();
  authFetch;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
      alert("You must be logged in to create a post.");
    }
  }, [user, authLoading, navigate]);

  const handleImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!featuredImage) {
      setError("Please select an image to upload.");
      return null;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("image", featuredImage);

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Image upload failed.");
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
      setMessage("Image uploaded successfully!");
      return data.imageUrl;
    } catch (err) {
      setError(err.message);
      console.error("Image upload error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to create a post.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    let finalImageUrl = imageUrl;

    if (featuredImage) {
      const uploadedUrl = await handleImageUpload();
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        setLoading(false);
        return;
      }
    }

    const newPost = {
      title,
      content,
      category,
      tags,
      imageUrl: finalImageUrl,
    };

    try {
      const response = await authFetch(`${API_BASE_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create post.");
      }

      const data = await response.json();
      setMessage("Post published successfully!");
      console.log("New post created:", data);

      // Clear form
      setTitle("");
      setContent("");
      setCategory("");
      setTags("");
      setFeaturedImage(null);
      setImageUrl("");

      navigate("/posts");
    } catch (err) {
      setError(err.message);
      console.error("Post creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="post-form-container">
        <div className="post-form-card">
          <p className="post-form-description">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="post-form-container">
        <div className="post-form-card">
          <h1 className="post-form-title">Access Denied</h1>
          <p className="post-form-description">
            Please log in to create a new post.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-form-container">
      <div className="post-form-card">
        <h1 className="post-form-title">Create a New Post</h1>
        <p className="post-form-description">
          Fill out the form below to publish your article.
        </p>

        <form onSubmit={handleSubmit}>
          {" "}
          {/* Changed to onSubmit */}
          <div className="form-group">
            <label htmlFor="post-title" className="form-label">
              Post Title
            </label>
            <input
              id="post-title"
              type="text"
              placeholder="e.g., My First Blog Post"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Featured Image</label>
            <div className="file-upload-area">
              <UploadCloud className="file-upload-icon" />
              <p className="file-upload-text">
                <span className="file-upload-link">Upload a file</span> or drag
                and drop
              </p>
              <p className="file-upload-info">PNG, JPG, GIF up to 10MB</p>
              <input
                type="file"
                className="file-upload-input"
                onChange={handleImageChange}
                disabled={loading}
              />
            </div>
            {featuredImage && (
              <p className="file-upload-info">Selected: {featuredImage.name}</p>
            )}
            {imageUrl && (
              <p className="file-upload-info">Image URL: {imageUrl}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Content</label>
            <div className="content-editor">
              <div className="editor-toolbar">
                <button
                  type="button"
                  className="toolbar-button"
                  disabled={loading}
                >
                  <Bold />
                </button>
                <button
                  type="button"
                  className="toolbar-button"
                  disabled={loading}
                >
                  <Italic />
                </button>
                <button
                  type="button"
                  className="toolbar-button"
                  disabled={loading}
                >
                  <Underline />
                </button>
                <span className="toolbar-separator"></span>
                <button
                  type="button"
                  className="toolbar-button"
                  disabled={loading}
                >
                  <List />
                </button>
                <button
                  type="button"
                  className="toolbar-button"
                  disabled={loading}
                >
                  <ListOrdered />
                </button>
                <span className="toolbar-separator"></span>
                <button
                  type="button"
                  className="toolbar-button"
                  disabled={loading}
                >
                  <Link />
                </button>
                <button
                  type="button"
                  className="toolbar-button"
                  disabled={loading}
                >
                  <ImageIcon />
                </button>
                <button
                  type="button"
                  className="toolbar-button"
                  disabled={loading}
                >
                  <Code />
                </button>
              </div>
              <textarea
                placeholder="Start writing your masterpiece..."
                rows="10"
                className="editor-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={loading}
              ></textarea>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Database">Database</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </select>
            </div>
            <div className="form-group flex-1">
              <label htmlFor="tags" className="form-label">
                Tags <span className="label-hint">(comma-separated)</span>
              </label>
              <input
                id="tags"
                type="text"
                placeholder="e.g., nodejs, express, mongodb"
                className="form-input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          {loading && (
            <p style={{ textAlign: "center", color: "#2563eb" }}>
              Processing...
            </p>
          )}
          {message && (
            <p style={{ textAlign: "center", color: "green" }}>{message}</p>
          )}
          {error && (
            <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>
          )}
          <div className="form-actions">
            <button
              type="button"
              className="action-button secondary"
              disabled={loading}
            >
              <Save className="action-icon" />
              Save as Draft
            </button>
            <button
              type="submit"
              className="action-button primary"
              disabled={loading}
            >
              <Upload className="action-icon" />
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
