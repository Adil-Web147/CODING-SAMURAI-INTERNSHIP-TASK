import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./auth-modal.css";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, loading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setMessage("");
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
    setProfilePicture(null);
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (isLoginMode) {
      const result = await login(email, password);
      if (result.success) {
        setMessage("Logged in successfully!");
        onClose();
      } else {
        setError(result.message);
      }
    } else {
      const result = await register(username, email, password, profilePicture);
      if (result.success) {
        setMessage("Registered successfully! You are now logged in.");
        onClose();
      } else {
        setError(result.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-content">
        <button className="auth-modal-close-button" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
        <h2 className="auth-modal-title">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
        <p className="auth-modal-description">
          {isLoginMode
            ? "Enter your credentials to access your account."
            : "Create your account to start blogging."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture (Optional)</label>
              <input
                id="profilePicture"
                type="file"
                onChange={handleFileChange}
                disabled={loading}
              />
              {profilePicture && (
                <p className="file-info">Selected: {profilePicture.name}</p>
              )}
            </div>
          )}

          {loading && <p className="auth-message loading">Processing...</p>}
          {message && <p className="auth-message success">{message}</p>}
          {error && <p className="auth-message error">{error}</p>}

          <button
            type="submit"
            className="auth-submit-button"
            disabled={loading}
          >
            {loading ? "Loading..." : isLoginMode ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="auth-toggle-text">
          {isLoginMode ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleToggleMode}
                className="auth-toggle-button"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={handleToggleMode}
                className="auth-toggle-button"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
