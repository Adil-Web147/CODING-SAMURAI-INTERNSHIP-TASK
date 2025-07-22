import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Plus, LogIn, UserPlus, LogOut, BookOpen } from "lucide-react";
import "./header.css";
import { useAuth } from "../context/AuthContext";

export default function Header({ onOpenAuthModal }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toggleMobileMenu();
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <Menu className="header-menu-icon" onClick={toggleMobileMenu} />
        <BookOpen className="header-app-logo-icon" />
        <span>BlogApp</span>
      </Link>
      <nav className="header-nav">
        <Link to="/" className="header-nav-link">
          Home
        </Link>
        <Link to="/posts" className="header-nav-link">
          Posts
        </Link>
        <Link to="/about" className="header-nav-link">
          About
        </Link>

        {user ? (
          <>
            <Link to="/new-post" className="header-new-post-button">
              <Plus className="header-new-post-icon" />
              New Post
            </Link>
            <button
              onClick={handleLogout}
              className="header-auth-button logout-button"
            >
              <LogOut className="header-auth-icon" />
              Logout ({user.username})
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onOpenAuthModal(true)}
              className="header-auth-button"
            >
              <LogIn className="header-auth-icon" />
              Login
            </button>
            <button
              onClick={() => onOpenAuthModal(false)}
              className="header-auth-button"
            >
              <UserPlus className="header-auth-icon" />
              Sign Up
            </button>
          </>
        )}
      </nav>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-menu-link" onClick={toggleMobileMenu}>
            <BookOpen className="header-app-logo-icon" /> {/* Add this line */}
            Home
          </Link>
          <Link
            to="/posts"
            className="mobile-menu-link"
            onClick={toggleMobileMenu}
          >
            Posts
          </Link>
          <Link
            to="/about"
            className="mobile-menu-link"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          {user ? (
            <>
              <Link
                to="/new-post"
                className="mobile-new-post-button"
                onClick={toggleMobileMenu}
              >
                <Plus className="header-new-post-icon" />
                New Post
              </Link>
              <button
                onClick={handleLogout}
                className="mobile-auth-button logout-button"
              >
                <LogOut className="header-auth-icon" />
                Logout ({user.username})
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onOpenAuthModal(true);
                  toggleMobileMenu();
                }}
                className="mobile-auth-button"
              >
                <LogIn className="header-auth-icon" />
                Login
              </button>
              <button
                onClick={() => {
                  onOpenAuthModal(false);
                  toggleMobileMenu();
                }}
                className="mobile-auth-button"
              >
                <UserPlus className="header-auth-icon" />
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
